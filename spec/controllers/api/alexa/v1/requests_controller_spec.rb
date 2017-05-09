require 'rails_helper'

RSpec.describe Api::Alexa::V1::RequestsController, type: :controller do

  describe "POST #default" do
    it "returns http success" do
      post :default
      expect(response).to have_http_status(:success)
    end
    it "returns json" do
      post :default
      expect(response.content_type).to eq 'application/json'
    end
  end

end
