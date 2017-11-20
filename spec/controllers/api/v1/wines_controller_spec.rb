require "rails_helper"

RSpec.describe Api::V1::WinesController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster: taster) }

  let(:create_params){
    {
      vintage: 2014,
      name: "Yno Cabernet Sauvignon",
      price: 29.99
    }
  }

  context "Guest request" do
    describe "POST #create" do
      it "returns http unauthorized" do
        post :create, params: {wine: create_params}
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
        post :create, params: {wine: create_params}
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
          post :create, params: {wine: create_params}
        }.to change(Wine, :count).by(1)
      end
      it "sets wine" do
        post :create, params: {wine: create_params}
        expect(Wine.last.name).to eq "Yno Cabernet Sauvignon"
      end
    end
  end

end
