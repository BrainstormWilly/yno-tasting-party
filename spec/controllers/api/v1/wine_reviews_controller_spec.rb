require "rails_helper"

RSpec.describe Api::V1::WineReviewsController, type: :controller do

  let(:init_time){ 1.hour.ago }
  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host: host, location: location)}
  let!(:tasting){ create(:tasting, host: host, location: location, open_at: 1.hour.from_now) }
  let!(:guest1){ create(:guest, tasting: tasting, taster: taster, invited: 1.hour.ago, confirmed: Time.current) }
  let!(:guest2){ create(:guest, tasting: tasting, taster: taster2, invited: 1.hour.ago, confirmed: Time.current) }
  let!(:wine1){ create(:wine) }
  let!(:wine2){ create(:wine) }
  let!(:tasting_wine1){ create(:tasting_wine, tasting: tasting, wine: wine1) }
  let!(:tasting_wine2){ create(:tasting_wine, tasting: tasting, wine: wine2) }
  let!(:wine_review_guest1_1){ create(:wine_review, tasting:tasting, taster: taster, wine_number: 1, created_at: init_time, updated_at: init_time) }
  let!(:wine_review_guest1_2){ create(:wine_review, tasting:tasting, taster: taster, wine_number: 2, created_at: init_time, updated_at: init_time) }
  let!(:wine_review_guest2_1){ create(:wine_review, tasting:tasting, taster: taster2, wine_number: 1, created_at: init_time, updated_at: init_time) }
  let!(:wine_review_guest2_2){ create(:wine_review, tasting:tasting, taster: taster2, wine_number: 2, created_at: init_time, updated_at: init_time) }

  context "Guest request" do
    describe "GET #index" do
      it "returns http unauthorized" do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "PUT #update" do
      it "returns http unauthorized" do
        put :update, params: {id: wine_review_guest1_1.id, wine_review:{rating: 5}}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #status" do
      it "returns http unauthorized" do
        get :status, params: {id: wine_review_guest1_1}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  context "Random Taster request" do
    before do
      random_user = create(:user)
      random_taster = create(:taster, user:random_user)
      auth_headers = random_user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in random_user, scope: :user
    end
    describe "GET #index" do
      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
      it "returns 0 reviews" do
        get :index
        data = ActiveSupport::JSON.decode(response.body)
        expect(data.count).to eq 0
      end
    end
    describe "PUT #update" do
      it "returns http forbidden" do
        put :update, params: {id: wine_review_guest1_1.id, wine_review:{rating: 5}}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "GET #status" do
      it "returns http forbidden" do
        get :status, params: {id: wine_review_guest1_1}
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  context "Tasting Taster request" do
    before do
      auth_headers = user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user, scope: :user
    end
    describe "GET #index" do
      before do
        wine_review_guest1_1.wine = wine1
        wine_review_guest1_2.wine = wine2
        # wine_review_guest2_1.wine = wine1
        # wine_review_guest2_2.wine = wine2
        wine_review_guest1_1.save
        wine_review_guest1_2.save
        # wine_review_guest2_1.save
        # wine_review_guest2_2.save
      end
      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
      it "returns 2 reviews" do
        get :index
        data = ActiveSupport::JSON.decode(response.body)
        expect(data.count).to eq 2
      end
    end
    describe "PUT #update" do
      it "returns http success for own review" do
        put :update, params: {id: wine_review_guest1_1.id, wine_review:{rating: 5}}
        expect(response).to have_http_status(:success)
      end
      it "updates own wine_review" do
        put :update, params: {id: wine_review_guest1_1.id, wine_review:{rating: 5}}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["rating"]).to eq 5
      end
      it "returns http forbidden for other review" do
        put :update, params: {id: wine_review_guest2_1.id, wine_review:{rating: 5}}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "GET #status" do
      it "returns http success" do
        get :status, params: {id: wine_review_guest1_1}
        expect(response).to have_http_status(:success)
      end
      it "returns all reviews for wine number" do
        get :status, params: {id: wine_review_guest1_1}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["all_reviews"].count).to eq 2
      end
    end
  end

end
