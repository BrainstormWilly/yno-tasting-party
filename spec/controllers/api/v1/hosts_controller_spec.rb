require "rails_helper"

RSpec.describe Api::V1::HostsController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host: host, location: location)}
  let!(:tasting){ create(:tasting, host: host, location: location) }

  context "Guest request" do
    describe "GET #hostFromUser" do
      it "returns http unauthorized" do
        get :hostFromUser, params: {id: user.id}
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
    describe "GET #hostFromUser" do
      it "returns http forbidden" do
        get :hostFromUser, params: {id: user2.id}
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
    describe "GET #hostFromUser" do
      it "returns http success" do
        get :hostFromUser, params: {id: user.id}
        expect(response).to have_http_status(:success)
      end
      it "returns host" do
        get :hostFromUser, params: {id: user.id}
        instance = ActiveSupport::JSON.decode(response.body)
        expect(instance["id"]).to eq host.id
      end
      it "returns host location" do
        get :hostFromUser, params: {id: user.id}
        instance = ActiveSupport::JSON.decode(response.body)
        expect(instance["locations"][0]["id"]).to eq host_location.id
      end
      it "returns location" do
        get :hostFromUser, params: {id: user.id}
        instance = ActiveSupport::JSON.decode(response.body)
        expect(instance["locations"][0]["location"]["address"]).to eq location.address
      end
    end
  end


end
