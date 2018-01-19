require "rails_helper"

RSpec.describe Api::V1::TastingWinesController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host:host, location:location) }
  let!(:wine){ create(:wine) }
  let!(:tasting){ create(:tasting, host:host, location:location) }
  let!(:guest1){ create(:guest, taster:taster, tasting:tasting, confirmed:Time.current) }
  let!(:guest2){ create(:guest, taster:taster2, tasting:tasting) }
  let(:tasting_wine){ create(:tasting_wine, tasting:tasting, wine:wine) }

  let(:wine_create_params){
    {
      vintage: 2014,
      name: "Yno Cabernet Sauvignon"
    }
  }

  let(:tasting_wine_update_params){
    {
      id: tasting_wine.id,
      tasting_wine:{
        wine_number:1
      }
    }
  }

  context "Guest request" do
    describe "POST #create" do
      it "returns http unauthorized" do
        post :create, params: {tasting_wine: {wine_id: wine.id, tasting_id:tasting.id, price:19.99}}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "PUT #update" do
      it "returns http unauthorized" do
        put :update, params: tasting_wine_update_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "DELETE #destroy" do
      it "returns http unauthorized" do
        delete :destroy, params: {id: tasting_wine.id}
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
    describe "POST #create" do
      it "returns http forbidden" do
        post :create, params: {tasting_wine: {wine_id: wine.id, tasting_id:tasting.id, price:19.99}}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "PUT #update" do
      it "returns http forbidden" do
        put :update, params: tasting_wine_update_params
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "DELETE #destroy" do
      it "returns http forbidden" do
        delete :destroy, params: {id: tasting_wine.id}
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
    describe "POST #create" do
      it "adds tasting wine" do
        expect {
          post :create, params: {tasting_wine: {wine_id: wine.id, tasting_id:tasting.id, price:19.99}}
        }.to change(TastingWine, :count).by(1)
      end
      it "sets wine" do
        post :create, params: {tasting_wine: {wine_id: wine.id, tasting_id:tasting.id, price:19.99}}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["wine"]["name"]).to eq wine.name
      end
      it "creates wine reviews for all confirmed guests" do
        expect{
          post :create, params: {tasting_wine: {wine_id: wine.id, tasting_id:tasting.id, price:19.99}}
        }.to change(WineReview, :count).by(1)
      end
    end
    describe "PUT #update" do
      it "returns http success" do
        put :update, params: tasting_wine_update_params
        expect(response).to have_http_status(:success)
      end
      it "changes tasting wine wine_number" do
        put :update, params: tasting_wine_update_params
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["wine_number"]).to eq 1
      end
    end
    describe "DELETE #destroy" do
      it "deletes tasting wine" do
        w = create(:wine)
        tw = create(:tasting_wine, tasting_id:tasting.id, wine_id:w.id)
        expect {
          delete :destroy, params: {id:tw.id}
        }.to change(TastingWine, :count).by(-1)
      end
      it "deletes created wine review" do
        w = create(:wine)
        tw = create(:tasting_wine, tasting_id:tasting.id, wine_id:w.id)
        expect {
          delete :destroy, params: {id:tw.id}
        }.to change(WineReview, :count).by(0)
      end
    end
  end

end
