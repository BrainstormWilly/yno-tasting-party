require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do

  let!(:user){ create(:user) }
  let!(:user2){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster:taster) }

  let(:new_user_invite){
    {
      email: "brainstormwilly@gmail.com"
    }
  }

  context "Guest request" do
    describe "GET #showUserByEmail" do
      it "returns http unauthorized" do
        post :showByEmail, params: {email: user2.email}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #invite" do
      it "returns http unauthorized" do
        post :invite, params: {user: new_user_invite}
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
    describe "GET #showUserByEmail for other user" do
      it "returns http forbidden" do
        post :showByEmail, params: {email: user.email}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "GET #showUserByEmail for self" do
      it "returns http success" do
        post :showByEmail, params: {email: user2.email}
        expect(response).to have_http_status(:success)
      end
    end
    describe "GET #invite" do
      it "returns http forbidden" do
        post :invite, params: {user: new_user_invite}
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
    describe "GET #showUserByEmail for other user" do
      it "returns http success" do
        post :showByEmail, params: {email: user2.email}
        expect(response).to have_http_status(:success)
      end
    end
    describe "GET #showUserByEmail for self" do
      it "returns http success" do
        post :showByEmail, params: {email: user.email}
        expect(response).to have_http_status(:success)
      end
    end
    describe "GET #invite" do
      it "returns http success" do
        post :invite, params: {user: new_user_invite}
        expect(response).to have_http_status(:success)
      end
      it "returns user" do
        post :invite, params: {user: new_user_invite}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["email"]).to eq "brainstormwilly@gmail.com"
      end
      it "creates raw token" do
        post :invite, params: {user: new_user_invite}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["raw_invitation_token"]).to be_kind_of(String)
      end
    end
  end

end
