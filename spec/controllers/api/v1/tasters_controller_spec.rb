require "rails_helper"

RSpec.describe Api::V1::TastersController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host: host, location: location)}
  let!(:tasting){ create(:tasting, host: host, location: location) }
  let!(:tasting2){ create(:tasting, host: host, location: location) }
  let!(:guest){ create(:guest, tasting: tasting, taster: taster, invited: 1.hour.ago, confirmed: Time.current) }
  let!(:guest2){ create(:guest, tasting: tasting2, taster: taster, invited: 1.hour.ago) }
  let!(:wine_review){ create(:wine_review, tasting:tasting, taster: taster, wine_number: 1) }
  let!(:wine_review2){ create(:wine_review, tasting:tasting2, taster: taster, wine_number: 1, updated_at: 1.minute.from_now) }

  context "Guest request" do
    describe "GET #show" do
      it "returns http unauthorized" do
        get :show, params: {id: user.id}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  context "Taster request" do
    before do
      auth_headers = user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user, scope: :user
    end
    describe "GET #show" do
      it "returns http success" do
        get :show, params: {id: taster.id}
        expect(response).to have_http_status(:success)
      end
      it "returns a guest_count" do
        get :show, params: {id: taster.id}
        taster = ActiveSupport::JSON.decode(response.body)
        expect(taster["guest_count"]).to eq 1
      end
      it "returns a invite_count" do
        get :show, params: {id: taster.id}
        taster = ActiveSupport::JSON.decode(response.body)
        expect(taster["invite_count"]).to eq 1
      end
      it "returns a review_count (including unrated)" do
        get :show, params: {id: taster.id}
        taster = ActiveSupport::JSON.decode(response.body)
        expect(taster["review_count"]).to eq 2
      end
    end
    describe "GET #tastings" do
      it "returns http success" do
        get :tastings, params: {id: taster.id}
        expect(response).to have_http_status(:success)
      end
      it "returns taster tastings" do
        get :tastings, params: {id: taster.id}
        tastings = ActiveSupport::JSON.decode(response.body)
        expect(tastings.count).to eq 1
      end
    end
    describe "GET #invites" do
      it "returns http success" do
        get :invites, params: {id: taster.id}
        expect(response).to have_http_status(:success)
      end
      it "returns taster tastings" do
        get :invites, params: {id: taster.id}
        tastings = ActiveSupport::JSON.decode(response.body)
        expect(tastings.count).to eq 1
      end
    end
    describe "GET #reviews" do
      it "returns http success" do
        get :reviews, params: {id: taster.id}
        expect(response).to have_http_status(:success)
      end
      it "returns taster reviews" do
        get :reviews, params: {id: taster.id}
        reviews = ActiveSupport::JSON.decode(response.body)
        expect(reviews.count).to eq 2
      end
    end
    describe "POST #create" do
      before do
        @user3 = create(:user)
      end
      it "creates taster" do
        post :create, params: {taster: {name: "Jane Doe", handle: "Wine Diva", user_id: @user3.id}}
        taster = ActiveSupport::JSON.decode(response.body)
        expect(taster["name"]).to eq "Jane Doe"
        expect(taster["id"]).to be
        expect(taster["user_id"]).to eq @user3.id
      end
    end
  end

end
