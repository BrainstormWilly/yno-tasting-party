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
  let!(:tasting_wine){ create(:tasting_wine, tasting:tasting, wine:wine) }

  let(:wine_create_params){
    {
      vintage: 2014,
      name: "Yno Cabernet Sauvignon"
    }
  }

  context "Guest request" do
    describe "POST #create" do
      it "returns http unauthorized" do
        post :createForTasting, params: {wine: wine_create_params, tasting_id:tasting.id, price:19.99}
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
        post :createForTasting, params: {wine: wine_create_params, tasting_id:tasting.id, price:19.99}
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
      it "adds wine" do
        expect {
          post :createForTasting, params: {wine: wine_create_params, tasting_id:tasting.id, price:19.99}
        }.to change(Wine, :count).by(1)
      end
      it "sets wine" do
        post :createForTasting, params: {wine: wine_create_params, tasting_id:tasting.id}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["wine"]["name"]).to eq "Yno Cabernet Sauvignon"
      end
    end
  end

end
