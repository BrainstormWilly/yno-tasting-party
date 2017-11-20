require "rails_helper"

RSpec.describe Api::V1::HostLocationsController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:location2){ create(:location) }
  let(:primary_host_location){ create(:host_location, location:location, host:host, primary:true) }
  let(:secondary_host_location){ create(:host_location, location:location2, host:host, primary:false) }

  let(:create_location_params){
    {
      phone: "555-123-4567",
      address: "123 Main St.",
      address2: nil,
      city: "MyTown",
      state: "CA",
      postal: "99999"
    }
  }


  context "Guest request" do
    describe "POST #create" do
      it "returns http unauthorized" do
        post :create, params: {location: create_location_params}
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
        post :create, params: {location: create_location_params}
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
          post :create, params: {location: create_location_params}
        }.to change(HostLocation, :count).by(1)
      end
      it "set primary on new host location to false" do
        post :create, params: {location: create_location_params}
        expect(HostLocation.last.primary).to be_falsey
      end
    end
  end
end
