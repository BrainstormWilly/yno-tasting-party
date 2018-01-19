require "rails_helper"

RSpec.describe Api::V1::HostLocationsController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:location2){ create(:location) }
  let(:location3){ create(:location) }
  let!(:primary_host_location){ create(:host_location, location:location, host:host, primary:true) }
  let!(:secondary_host_location){ create(:host_location, location:location2, host:host, primary:false) }


  let(:create_location_params){
    {
      host_id: host.id,
      location_id: location3.id,
      primary: false
    }
  }

  let(:create_primary_location_params){
    {
      host_id: host.id,
      location_id: location3.id,
      primary: true
    }
  }

  let(:update_location_params){
    {
      primary: true
    }
  }


  context "Guest request" do
    describe "POST #create" do
      it "returns http unauthorized" do
        post :create, params: {host_location: create_location_params}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "PUT #update" do
      it "returns http unauthorized" do
        put :update, params: {id:secondary_host_location.id, host_location:update_location_params}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "DELETE #destroy" do
      it "returns http unauthorized" do
        delete :destroy, params: {id:primary_host_location.id}
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
        post :create, params: {host_location: create_location_params}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "PUT #update" do
      it "returns http forbidden" do
        put :update, params: {id:secondary_host_location.id, host_location:update_location_params}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "DELETE #destroy" do
      it "returns http forbidden" do
        delete :destroy, params: {id:primary_host_location.id}
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
      it "adds host location" do
        expect {
          post :create, params: {host_location: create_location_params}
        }.to change(HostLocation, :count).by(1)
      end
      context "adding non-primary location" do
        it "sets primary on new host location to false" do
          post :create, params: {host_location: create_location_params}
          expect(HostLocation.last.primary).to be_falsey
        end
        it "does not change primary location" do
          post :create, params: {host_location: create_location_params}
          old_primary_location = HostLocation.find(primary_host_location.id)
          expect(old_primary_location.primary).to be_truthy
        end
      end
      context "adding new primary location" do
        it "sets primary on new host location to false" do
          post :create, params: {host_location: create_primary_location_params}
          expect(HostLocation.last.primary).to be_truthy
        end
        it "changes old primary location" do
          post :create, params: {host_location: create_primary_location_params}
          old_primary_location = HostLocation.find(primary_host_location.id)
          expect(old_primary_location.primary).to be_falsey
        end
      end
    end
    describe "PUT #update" do
      it "returns http success" do
        put :update, params: {id:secondary_host_location.id, host_location:update_location_params}
        expect(response).to have_http_status(:success)
      end
      it "updates primary to true" do
        put :update, params: {id:secondary_host_location.id, host_location:update_location_params}
        hl = HostLocation.find(secondary_host_location.id)
        expect(hl.primary).to be_truthy
      end
      it "changes previous primary to false" do
        put :update, params: {id:secondary_host_location.id, host_location:update_location_params}
        hl = HostLocation.find(primary_host_location.id)
        expect(hl.primary).to be_falsey
      end
    end
    describe "DELETE #destroy" do
      it "returns http success" do
        delete :destroy, params: {id:primary_host_location.id}
        expect(response).to have_http_status(:success)
      end
      it "deletes host location" do
        delete :destroy, params: {id:primary_host_location.id}
        hls = HostLocation.where(id:primary_host_location.id)
        expect(hls.count).to eq 0
      end
      it "changes primary_host_location" do
        delete :destroy, params: {id:primary_host_location.id}
        hl = HostLocation.find(secondary_host_location.id)
        expect(hl.primary).to be_truthy
      end
    end
  end

end
