require "rails_helper"

RSpec.describe Api::V1::TastingsController, type: :controller do

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
  let!(:wine_review_guest1_1){ create(:wine_review, tasting:tasting, taster: taster, wine_number: 1) }
  let!(:wine_review_guest1_2){ create(:wine_review, tasting:tasting, taster: taster, wine_number: 2) }
  let!(:wine_review_guest2_1){ create(:wine_review, tasting:tasting, taster: taster2, wine_number: 1) }
  let!(:wine_review_guest2_2){ create(:wine_review, tasting:tasting, taster: taster2, wine_number: 2) }

  let(:create_tasting_params){
    {
      name: "Test",
      description: "Test test",
      open_at: 1.hour.from_now,
      close_at: 3.hours.from_now,
      location_id: location.id
    }
  }

  let(:update_tasting_params){
    {
      name: "Hello World"
    }
  }

  context "Guest request" do
    describe "GET #show" do
      it "returns http unauthorized" do
        get :show, params: {id: user.id}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #new" do
      it "returns http unauthorized" do
        get :new
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "POST #create" do
      it "returns http unauthorized" do
        post :create, params: {tasting: create_tasting_params}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #index" do
      it "returns http unauthorized" do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "PUT #update" do
      it "returns http unauthorized" do
        put :update, params: {id: tasting.id, tasting: update_tasting_params}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  context "Taster request" do
    before do
      auth_headers = user2.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user2, scope: :user
    end
    describe "GET #new" do
      it "returns http forbidden" do
        get :new
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "POST #create" do
      it "returns http forbidden" do
        post :create, params: {tasting: create_tasting_params}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "GET #index" do
      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
      it "returns 1 tasting" do
        get :index
        data = ActiveSupport::JSON.decode(response.body)
        expect(data.count).to eq 1
      end
    end
    describe "PUT #update" do
      it "returns http forbidden" do
        put :update, params: {id: tasting.id, tasting: update_tasting_params}
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  context "Host request" do
    before do
      auth_headers = user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user, scope: :user
    end
    describe "GET #new" do
      it "returns http success" do
        get :new
        expect(response).to have_http_status(:success)
      end
    end
    describe "GET #show" do
      context "pending tasting" do
        it "returns http success" do
          get :show, params: {id: tasting.id}
          expect(response).to have_http_status(:success)
        end
        it "returns tasting #name" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["name"]).to eq tasting.name
        end
        it "returns tasting #is_pending as true" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_pending"]).to be_truthy
        end
        it "returns tasting #is_open as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_open"]).to be_falsey
        end
        it "returns tasting #is_open as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_open"]).to be_falsey
        end
        it "returns tasting #is_closed as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_closed"]).to be_falsey
        end
        it "returns tasting #is_completed as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_completed"]).to be_falsey
        end
        it "returns 2 tasting_wines" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["tasting_wines"].count).to eq 2
        end
        it "returns 2 guests" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["guests"].count).to eq 2
        end
        it "returns a taster for guest 1" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["guests"][0]["taster"]["id"]).to eq taster.id
        end
      end
      context "open tasting" do
        before do
          tasting.update(open_at: Time.current)
        end
        it "returns tasting #status as 'Open'" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["status"]).to eq "Open"
        end
      end
      context "tasting in progress" do
        before do
          tasting.update(open_at: Time.current)
          wine_review_guest1_1.update(rating: 4)
          wine_review_guest1_2.update(rating: 4)
        end
        it "returns tasting #tasting_progress at 50%" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["tasting_progress"]).to eq 0.5
        end
      end
      context "tasting is closed" do
        before do
          tasting.update(open_at: 1.hour.ago)
          tasting.update(closed_at: Time.current)
        end
        it "returns tasting #is_pending as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_pending"]).to be_falsey
        end
        it "returns tasting #is_closed as true" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_closed"]).to be_truthy
        end
        it "returns tasting #is_completed as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_completed"]).to be_falsey
        end
        it "returns tasting #is_open as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_open"]).to be_falsey
        end
      end
      context "tasting is completed" do
        before do
          tasting.update(open_at: 1.hour.ago)
          tasting.update(completed_at: Time.current)
        end
        it "returns tasting #is_pending as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_pending"]).to be_falsey
        end
        it "returns tasting #is_closed as true" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_closed"]).to be_truthy
        end
        it "returns tasting #is_completed as true" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_completed"]).to be_truthy
        end
        it "returns tasting #is_open as false" do
          get :show, params: {id: tasting.id}
          data = ActiveSupport::JSON.decode(response.body)
          expect(data["is_open"]).to be_falsey
        end
      end
    end
    describe "POST #create" do
      it "returns http success" do
        post :create, params: {tasting: create_tasting_params}
        expect(response).to have_http_status(:success)
      end
      it "adds tasting" do
        expect {
          post :create, params: {tasting: create_tasting_params}
        }.to change(Tasting, :count).by(1)
      end
      it "returns tasting" do
        post :create, params: {tasting: create_tasting_params}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["name"]).to eq "Test"
      end
    end
    describe "GET #index" do
      before do
        host2 = create(:host, taster:taster2)
        location2 = create(:location)
        host_location2 = create(:host_location, host: host2, location: location2)
        tasting2 = create(:tasting, host: host2, location: location2, open_at: 1.hour.from_now)
        guest3 = create(:guest, tasting: tasting2, taster: taster, invited: 1.hour.ago, confirmed: Time.current)
      end
      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
      it "returns 2 tastings" do
        get :index
        data = ActiveSupport::JSON.decode(response.body)
        expect(data.count).to eq 2
      end
    end
    describe "PUT #update" do
      context "pending tasting" do
        it "returns http success" do
          put :update, params: {id: tasting.id, tasting: update_tasting_params}
          expect(response).to have_http_status(:success)
        end
      end
      context "open tasting" do
        before do
          tasting.update(open_at: Time.current)
        end
        it "returns http success" do
          put :update, params: {id: tasting.id, tasting: update_tasting_params}
          expect(response).to have_http_status(:success)
        end
      end
      context "closed tasting" do
        before do
          tasting.update(open_at: 1.hour.ago)
          tasting.update(closed_at: Time.current)
        end
        it "returns http success" do
          put :update, params: {id: tasting.id, tasting: update_tasting_params}
          expect(response).to have_http_status(:success)
        end
      end
      context "completed tasting" do
        before do
          tasting.update(open_at: 1.hour.ago)
          tasting.update(completed_at: Time.current)
        end
        it "returns http forbidden" do
          put :update, params: {id: tasting.id, tasting: update_tasting_params}
          expect(response).to have_http_status(:forbidden)
        end
      end
    end
  end

end
