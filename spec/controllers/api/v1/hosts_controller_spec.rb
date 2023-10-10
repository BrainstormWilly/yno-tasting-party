require "rails_helper"

RSpec.describe Api::V1::HostsController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let(:user3){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let(:taster3){ create(:taster, user: user3) }
  let!(:host){ create(:host, taster: taster) }
  let!(:host2){ create(:host, taster: taster2) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host: host, location: location)}
  let!(:tasting){ create(:tasting, host: host, location: location) }
  let!(:connection){ create(:connection, host:host, taster:taster3) }

  let(:create_host_params){
    {
      taster_id: taster3.id
    }
  }

  context "Guest request" do
    describe "GET #hostFromUser" do
      it "returns http unauthorized" do
        get :hostFromUser, params: {id: user.id}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    # describe "GET #show" do
    #   it "returns http unauthorized" do
    #     get :show, params: {id: host.id}
    #     expect(response).to have_http_status(:unauthorized)
    #   end
    # end
    describe "POST #create" do
      it "returns http unauthorized" do
        post :create, params: {host: create_host_params}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  context "Taster request" do
    context "for existing host" do
      before do
        auth_headers = user2.create_new_auth_token
        @request.headers.merge(auth_headers)
        sign_in user2, scope: :user
      end
      describe "GET #hostFromUser" do
        it "returns http success" do
          get :hostFromUser, params: {id: user2.id}
          expect(response).to have_http_status(:success)
        end
      end
      # describe "GET #show" do
      #   it "returns http forbidden" do
      #     get :show, params: {id: host.id}
      #     expect(response).to have_http_status(:forbidden)
      #   end
      # end
    end
    context "for new host" do
      before do
        auth_headers = user3.create_new_auth_token
        @request.headers.merge(auth_headers)
        sign_in user3, scope: :user
      end
      describe "POST #create" do
        it "returns http success" do
          post :create, params: {host: create_host_params}
          expect(response).to have_http_status(:success)
        end
        it "does not auto-set host connection" do
          post :create, params: {host: create_host_params}
          instance = ActiveSupport::JSON.decode(response.body)
          expect(instance["connections"].count).to eq 0
        end
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
    describe "POST #create" do
      it "returns http forbidden" do
        post :create, params: {host: create_host_params}
        expect(response).to have_http_status(:forbidden)
      end
    end
    # describe "GET #show" do
    #   it "returns http success" do
    #     get :show, params: {id: host.id}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "returns http unauthorized for other host" do
    #     get :show, params: {id: host2.id}
    #     expect(response).to have_http_status(:unauthorized)
    #   end
    # end
  end


end
