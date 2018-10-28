require "rails_helper"

RSpec.describe Api::V1::AdminController, type: :controller do

  let(:contact_us_guest_params){
    {
      message:{name: "John Doe",
      content: "Hello world",
      email: "john@doe.com"}
    }
  }
  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:host_location){ create(:host_location, host: host, location: location) }
  let(:tasting){ create(:tasting, host: host, location: location) }


  context "Guest request" do
    describe "POST #contactUs" do
      it "returns http success" do
        post :contactUs, params: contact_us_guest_params
        expect(response).to have_http_status(:success)
      end
      it "returns response message for guest" do
        post :contactUs, params: contact_us_guest_params
        msg = ActiveSupport::JSON.decode(response.body)
        expect(msg["message"]).to eq "Thank you John Doe! We’ll get back to you soon...promise."
      end
    end
    describe "POST #newSignUp" do
      it "returns http success" do
        put :newSignUp , params: {taster_id: taster.id}
        expect(response).to have_http_status(:success)
      end
    end
    describe "POST #newTasting" do
      it "returns http unauthorized" do
        put :newTasting , params: {tasting_id: tasting.id}
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
    describe "POST #contactUs" do
      it "returns http success" do
        post :contactUs, params: contact_us_guest_params
        expect(response).to have_http_status(:success)
      end
      it "returns response message for guest" do
        post :contactUs, params: contact_us_guest_params
        msg = ActiveSupport::JSON.decode(response.body)
        expect(msg["message"]).to eq "Thank you John Doe! We’ll get back to you soon...promise."
      end
    end
    describe "POST #newSignUp" do
      it "returns http success" do
        put :newSignUp , params: {taster_id: taster.id}
        expect(response).to have_http_status(:success)
      end
    end
    describe "POST #newTasting" do
      it "returns http success" do
        put :newTasting , params: {tasting_id: tasting.id}
        expect(response).to have_http_status(:success)
      end
    end
  end


end
