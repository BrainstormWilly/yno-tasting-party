require "rails_helper"

RSpec.describe Api::V1::LocationsController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user:user) }
  let(:location){ create(:location) }

  let(:create_location_params){
    {
      phone: "123-456-7890",
      address: "123 Main St.",
      address2: "Suite A",
      city: "Santa Rosa",
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
      auth_headers = user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user, scope: :user
    end
    describe "POST #create" do
      it "returns http success" do
        post :create, params: {location: create_location_params}
        expect(response).to have_http_status(:success)
      end
    end
  end

end
