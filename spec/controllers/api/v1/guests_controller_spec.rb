require "rails_helper"

RSpec.describe Api::V1::GuestsController, type: :controller do

  let!(:user){ create(:user) }
  let!(:guest_user){ create(:user, invited_by_id: user.id) }
  let!(:taster){ create(:taster, user:) }
  let!(:guest_taster){ create(:taster, user: guest_user) }
  let!(:host){ create(:host, taster:) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host:, location:)}
  let!(:tasting){ create(:tasting, host:, location:) }
  let!(:guest){ create(:guest, tasting:, taster: guest_taster, invited:Time.current) }
  let!(:wine){ create(:wine) }
  let!(:tasting_wine){ create(:tasting_wine, wine:, tasting:) }
  let(:random_taster){ create(:taster, user: create(:user)) }

  # let(:encoded_user_email){
  #   URI.encode(user.email)
  # }

  let(:invite_user_params){
    {
      email: "john@noemail.com",
      tasting_id: tasting.id
    }
  }

  let(:invite_taster_params){
    {
      taster_id: guest_taster.id,
      tasting_id: tasting.id
    }
  }

  let(:invite_non_connected_taster_params){
    {
      taster_id: random_taster.id,
      tasting_id: tasting.id
    }
  }

  let(:create_guest_params){
    {
      guest:{
        tasting_id: tasting.id,
        taster_id: random_taster.id
      }
    }
  }

  context "Guest request" do
    describe "POST #inviteNewUser" do
      it "returns http unauthorized" do
        post :inviteNewUser, params: invite_user_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "POST #inviteTaster" do
      it "returns http unauthorized" do
        post :inviteTaster, params: invite_taster_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "POST #create" do
      it "returns http unauthorized" do
        post :create, params:create_guest_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #show" do
      it "returns http unauthorized" do
        get :show, params: { id: guest.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #includeHost" do
      it "returns http unauthorized" do
        get :includeHost, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
    # describe "GET #removeHost" do
    #   it "returns http unauthorized" do
    #     get :removeHost, params: { tasting_id: tasting.id }
    #     expect(response).to have_http_status(:unauthorized)
    #   end
    # end
    describe "GET #confirm" do
      it "returns http unauthorized" do
        get :confirm, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #deny" do
      it "returns http unauthorized" do
        get :deny, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "GET #invitations" do
      it "returns http unauthorized" do
        get :invitations
        expect(response).to have_http_status(:unauthorized)
      end
    end
    describe "DELETE #destroy" do
      it "returns http unauthorized" do
        delete :destroy, params: { id: guest.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  context "Random Taster request" do
    before do
      user2 = create(:user)
      taster2 = create(:taster, user:user2)
      auth_headers = user2.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user2, scope: :user
    end
    describe "GET #inviteNewUser" do
      it "returns http forbidden" do
        post :inviteNewUser, params: invite_user_params
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "POST #inviteTaster" do
      it "returns http forbidden" do
        post :inviteTaster, params: invite_taster_params
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "POST #create" do
      it "returns http forbidden" do
        post :create, params:create_guest_params
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "GET #show" do
      it "returns http forbidden" do
        get :show, params: { id: guest.id }
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "GET #includeHost" do
      it "returns http forbidden" do
        get :includeHost, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:forbidden)
      end
    end
    # describe "GET #removeHost" do
    #   it "returns http forbidden" do
    #     get :removeHost, params: { tasting_id: tasting.id }
    #     expect(response).to have_http_status(:forbidden)
    #   end
    # end
    describe "GET #confirm" do
      it "returns http bad request" do
        get :confirm, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:bad_request)
      end
    end
    describe "GET #deny" do
      it "returns http bad request" do
        get :deny, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:bad_request)
      end
    end
    describe "GET #invitations" do
      it "returns http success" do
        get :invitations
        expect(response).to have_http_status(:success)
      end
      it "returns 0 invitations" do
        get :invitations
        data = ActiveSupport::JSON.decode(response.body)
        expect(data.count).to eq 0
      end
    end
    describe "DELETE #destroy unconfirmed guest" do
      it "returns http forbidden" do
        delete :destroy, params: { id: guest.id }
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "DELETE #destroy confirmed guest" do
      before do
        guest.confirmed = Time.current
        guest.save
      end
      it "returns http forbidden" do
        delete :destroy, params: { id: guest.id }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  context "Tasting Guest request" do
    before do
      auth_headers = guest_user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in guest_user, scope: :user
    end
    describe "POST #create" do
      it "returns http forbidden" do
        post :create, params:create_guest_params
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "POST #inviteTaster" do
      it "returns http forbidden" do
        post :inviteTaster, params: invite_taster_params
        expect(response).to have_http_status(:forbidden)
      end
    end
    describe "GET #show" do
      before do
        temp_guest_user = create(:user);
        temp_guest_taster = create(:taster, user:temp_guest_user)
        @temp_guest = create(:guest, taster:temp_guest_taster, tasting:tasting)
      end
      it "returns http success for self" do
        get :show, params: { id: guest.id }
        expect(response).to have_http_status(:success)
      end
      it "returns http success for fellow tasting guest" do
        get :show, params: {id: @temp_guest.id}
        expect(response).to have_http_status(:success)
      end
    end
    describe "GET #confirm" do
      it "returns http success" do
        get :confirm, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:success)
      end
      it "confirms guest" do
        get :confirm, params: { tasting_id: tasting.id }
        data = ActiveSupport::JSON.decode(response.body)
        expect(data["confirmed"]).not_to be_nil
      end
      it "creates connection" do
        get :confirm, params: { tasting_id: tasting.id }
        conns = Connection.where(taster_id:guest_taster.id, host_id:host.id)
        expect(conns.count).to eq 1
      end
      it "adds wine review(s)" do
        expect{
          get :confirm, params: { tasting_id: tasting.id }
        }.to change(WineReview, :count).by(1)
      end
    end
    describe "GET #deny" do
      it "returns http success" do
        get :deny, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:success)
      end
      it "removes guest" do
        expect{
          get :deny, params: { tasting_id: tasting.id }
        }.to change(Guest, :count).by(-1)
      end
      it "does not add wine review(s)" do
        expect{
          get :deny, params: { tasting_id: tasting.id }
        }.to change(WineReview, :count).by(0)
      end
    end
    describe "GET #invitations" do
      it "returns http success" do
        get :invitations
        expect(response).to have_http_status(:success)
      end
      it "returns guest" do
        get :invitations
        data = ActiveSupport::JSON.decode(response.body)
        expect(data[0]["id"]).to eq guest.id
      end
    end
    describe "DELETE #destroy unconfirmed guest" do
      it "returns http success" do
        delete :destroy, params: { id: guest.id }
        expect(response).to have_http_status(:success)
      end
    end
    describe "DELETE #destroy confirmed guest" do
      before do
        guest.confirmed = Time.current
        guest.save
        create(:wine_review, taster: guest_taster, tasting:)
      end
      it "returns http success" do
        delete :destroy, params: { id: guest.id }
        expect(response).to have_http_status(:success)
      end
      it "deletes guest" do
        delete :destroy, params: { id: guest.id }
        data = ActiveSupport::JSON.decode(response.body)
        expect(Guest.where(id:data["id"]).count).to eq 0
      end
      it "deletes reviews" do
        expect{
          delete :destroy, params: { id: guest.id }
        }.to change(WineReview, :count).by(-1)
      end
    end
  end

  context "Host request" do
    before do
      auth_headers = user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user, scope: :user
    end
    describe "POST #inviteNewUser" do
      it 'sends email' do
        expect { post :inviteNewUser, params: invite_user_params }
          .to change {ActionMailer::Base.deliveries.count}.by(1)
      end
      it 'creates user' do
        expect{ post :inviteNewUser, params: invite_user_params }
          .to change{User.count}.by(1)
      end
    end
    describe "POST #inviteTaster" do
      it "returns http success on connected taster" do
        post :inviteTaster, params: invite_taster_params
        expect(response).to have_http_status(:success)
      end
      it "returns http success on non-connected taster" do
        post :inviteTaster, params: invite_non_connected_taster_params
        expect(response).to have_http_status(:success)
      end
    end
    describe "POST #create" do
      it "returns http success" do
        post :create, params:create_guest_params
        expect(response).to have_http_status(:success)
      end
    end
    describe "GET #show" do
      it "returns http success for guest" do
        get :show, params: { id: guest.id }
        expect(response).to have_http_status(:success)
      end
    end
    describe "GET #includeHost" do
      it "returns http success" do
        get :includeHost, params: { tasting_id: tasting.id }
        expect(response).to have_http_status(:success)
      end
      it "increases Guest count" do
        expect{
          get :includeHost, params: { tasting_id: tasting.id }
        }.to change(Guest, :count).by(1)
      end
    end
    # describe "GET #removeHost" do
    #   before do
    #     create(:guest, tasting:tasting, taster:taster)
    #   end
    #   it "returns http success" do
    #     get :removeHost, params: { tasting_id: tasting.id }
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "decreases Guest count" do
    #     expect{
    #       get :removeHost, params: { tasting_id: tasting.id }
    #     }.to change(Guest, :count).by(-1)
    #   end
    # end
    describe "GET #invitations" do
      it "returns http success" do
        get :invitations
        expect(response).to have_http_status(:success)
      end
      it "returns 0 invitations" do
        get :invitations
        data = ActiveSupport::JSON.decode(response.body)
        expect(data.count).to eq 0
      end
    end
    describe "DELETE #destroy unconfirmed guest" do
      it "returns http forbidden" do
        delete :destroy, params: { id: guest.id }
        expect(response).to have_http_status(:success)
      end
    end
    describe "DELETE #destroy confirmed guest" do
      before do
        guest.confirmed = Time.current
        guest.save
        create(:wine_review, taster:guest_taster, tasting:tasting)
      end
      it "returns http success" do
        delete :destroy, params: { id: guest.id }
        expect(response).to have_http_status(:success)
      end
      it "deletes guest" do
        delete :destroy, params: { id: guest.id }
        data = ActiveSupport::JSON.decode(response.body)
        expect(Guest.where(id:data["id"]).count).to eq 0
      end
      it "deletes reviews" do
        expect{
          delete :destroy, params: { id: guest.id }
        }.to change(WineReview, :count).by(-1)
      end
    end
  end
end
