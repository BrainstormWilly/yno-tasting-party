require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:reset_tokens) { Devise.token_generator.generate(User, :reset_password_token) }
  let!(:user){ create(:user, reset_password_token: reset_tokens[1], reset_password_sent_at: Time.now.utc) }
  let!(:user2){ create(:user) }
  let!(:user3){ create(:user) }
  let!(:taster){ create(:taster, user:) }
  let!(:taster2){ create(:taster, user: user2) }
  let!(:host){ create(:host, taster:) }
  let!(:connection){ create(:connection, host:, taster: taster2) }

  let(:update_user_params){
    {
      email: "update@user.com",
      password: "654321",
      password_confirmation: "654321"
    }
  }

  let(:reset_user_params){
    {
      user:{
        reset_password_token: reset_tokens[0],
        password: "654321",
        password_confirmation: "654321"
      }
    }
  }

  context "Guest request" do
    before do
      token_user = User.invite!({email: "brainstormwilly@gmail.com"}) do |u|
        u.skip_invitation = true
        u.invited_by_id = host.taster.user.id
      end
      token_taster = create(:taster, user:token_user)
      @user_params = {
        invitation_token: token_user.raw_invitation_token,
        user:{
          password:"123456",
          password_confirmation:"123456"
        }
      }
      @bad_params = {
        invitation_token: "badtoken",
        user:{
          password:"123456",
          password_confirmation:"123456"
        }
      }
    end
    describe "GET #showUserByEmail" do
      it "returns http unauthorized" do
        post :showByEmail, params: {email: user.email}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "PUT #acceptInvitation for valid token" do
      it "returns http success" do
        put :acceptInvitation, params: @user_params
        expect(response).to have_http_status(:success)
      end
    end
    describe "PUT #acceptInvitation for bad token" do
      it "returns http 400" do
        put :acceptInvitation, params: @bad_params
        expect(response).to have_http_status(400)
      end
    end
    describe "GET #show" do
      it "returns http unauthorized" do
        get :show, params: {id: user.id}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "POST #resetUserPassword" do
      it "returns http success" do
        post :resetUserPassword, params: reset_user_params
        expect(response).to have_http_status(:success)
      end
    end
    # describe "PUT #update" do
    #   it "returns http unauthorized" do
    #     put :update, params: {id: user.id, user: update_user_params}
    #     expect(response).to have_http_status(:unauthorized)
    #   end
    # end
    # describe "DELETE #destroy" do
    #   it "returns http unauthorized" do
    #     delete :destroy, params: {id: user.id}
    #     expect(response).to have_http_status(:unauthorized)
    #   end
    # end
  end

  context "User request" do
    before do
      auth_headers = user2.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user2, scope: :user
      token_user = User.invite!({email: "brainstormwilly@gmail.com"}) do |u|
        u.skip_invitation = true
        u.invited_by_id = host.taster.user.id
      end
      token_taster = create(:taster, user:token_user)
      @user_params = {
        invitation_token: token_user.raw_invitation_token,
        user:{
          password:"123456",
          password_confirmation:"123456"
        }
      }
    end
    describe "GET #showUserByEmail" do
      it "returns http forbidden" do
        post :showByEmail, params: {email: user2.email}
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "PUT #acceptInvitation for valid token" do
      it "returns http 400" do
        put :acceptInvitation, params: @user_params
        expect(response).to have_http_status(400)
      end
    end
    describe "GET #show" do
      it "returns http forbidden for other user" do
        get :show, params: {id: user.id}
        expect(response).to have_http_status(:forbidden)
      end
      it "returns http success for self" do
        get :show, params: {id: user2.id}
        expect(response).to have_http_status(:success)
      end
      it "returns taster for self" do
        get :show, params: {id: user2.id}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["taster"]["name"]).to eq taster2.name
      end
      it "returns nil host for self" do
        get :show, params: {id: user2.id}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["host"]).to be_nil
      end
    end
    describe "POST #resetUserPassword" do
      it "returns http forbidden for other user" do
        post :resetUserPassword, params: reset_user_params
        expect(response).to have_http_status(:forbidden)
      end
    end
    # describe "PUT #update" do
    #   it "returns http forbidden for other user" do
    #     put :update, params: {id: user.id, user: update_user_params}
    #     expect(response).to have_http_status(:forbidden)
    #   end
    #   it "returns http success for self" do
    #     put :update, params: {id: user2.id, user: update_user_params}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "updates self" do
    #     put :update, params: {id: user2.id, user: update_user_params}
    #     data = ActiveSupport::JSON.decode(response.body)
    #     expect(data["email"]).to eq "update@user.com"
    #   end
    # end
    # describe "DELETE #destroy" do
    #   it "deletes self" do
    #     delete :destroy, params: {id: user2.id}
    #     users = User.where(id:user2.id)
    #     expect(users.count).to eq 0
    #   end
    #   it "deleting other user is forbidden" do
    #     delete :destroy, params: {id: user.id}
    #     expect(response).to have_http_status(:forbidden)
    #   end
    #   it "can not delete other user" do
    #     delete :destroy, params: {id: user.id}
    #     users = User.where(id:user.id)
    #     expect(users.count).to eq 1
    #   end
    # end
  end


  context "Host request" do
    before do
      auth_headers = user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user, scope: :user
      token_user = User.invite!({email: "brainstormwilly@gmail.com"}) do |u|
        u.skip_invitation = true
        u.invited_by_id = host.taster.user.id
      end
      token_taster = create(:taster, user:token_user)
      @user_params = {
        invitation_token: token_user.raw_invitation_token,
        user:{
          password:"123456",
          password_confirmation:"123456"
        }
      }
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
    describe "PUT #acceptInvitation for valid token" do
      it "returns http 400" do
        put :acceptInvitation, params: @user_params
        expect(response).to have_http_status(400)
      end
    end
    describe "GET #show" do
      it "returns http forbidden for other user" do
        get :show, params: {id: user2.id}
        expect(response).to have_http_status(:forbidden)
      end
      it "returns http success for self" do
        get :show, params: {id: user.id}
        expect(response).to have_http_status(:success)
      end
      it "returns taster for self" do
        get :show, params: {id: user.id}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["taster"]["name"]).to eq taster.name
      end
      it "returns host for self" do
        get :show, params: {id: user.id}
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["host"]["id"]).to eq host.id
      end
    end
    describe "POST #resetUserPassword" do
      it "returns http success" do
        post :resetUserPassword, params: reset_user_params
        expect(response).to have_http_status(:success)
      end
    end
    # describe "PUT #update" do
    #   it "returns http forbidden for other user" do
    #     put :update, params: {id: user2.id, user: update_user_params}
    #     expect(response).to have_http_status(:forbidden)
    #   end
    #   it "returns http success for self" do
    #     put :update, params: {id: user.id, user: update_user_params}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "updates self" do
    #     put :update, params: {id: user.id, user: update_user_params}
    #     data = ActiveSupport::JSON.decode(response.body)
    #     expect(data["email"]).to eq "update@user.com"
    #   end
    # end
    # describe "DELETE #destroy" do
    #   it "deletes self" do
    #     delete :destroy, params: {id: user.id}
    #     users = User.where(id:user.id)
    #     expect(users.count).to eq 0
    #   end
    #   it "deleting other user is forbidden" do
    #     delete :destroy, params: {id: user2.id}
    #     expect(response).to have_http_status(:forbidden)
    #   end
    #   it "can not delete other user" do
    #     delete :destroy, params: {id: user2.id}
    #     users = User.where(id:user2.id)
    #     expect(users.count).to eq 1
    #   end
    # end
  end

end
