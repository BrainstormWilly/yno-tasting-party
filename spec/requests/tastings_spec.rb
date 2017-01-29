require 'rails_helper'

RSpec.describe "Tastings", type: :request do
  describe "GET /tastings" do
    it "works! (now write some real specs)" do
      get tastings_path
      expect(response).to have_http_status(200)
    end
  end
end
