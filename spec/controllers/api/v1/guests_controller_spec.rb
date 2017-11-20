require "rails_helper"

RSpec.describe Api::V1::GuestsController, type: :controller do

  let!(:user){ create(:user) }
  let!(:guest_user){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host: host, location: location)}
  let!(:tasting){ create(:tasting, host: host, location: location) }
  # let!(:guest){ create(:guest, tasting:tasting, taster:taster) }

  # let(:encoded_user_email){
  #   URI.encode(user.email)
  # }

  let(:invite_user){
    {
      email: "john@doe.com"
    }
  }

  let(:guest_params){
    {
      tasting_id: tasting.id,
      taster_id: taster2.id
    }
  }

  context "Guest request" do
    describe "GET #inviteNewUser" do
      it "returns http unauthorized" do
        post :inviteNewUser, params: {guest: encoded_user_email}
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
    # describe "GET #showByEmail" do
    #   it "returns http forbidden" do
    #     post :showByEmail, params: {email: encoded_user_email}
    #     expect(response).to have_http_status(:forbidden)
    #   end
    # end
  end

  context "Host request" do
    before do
      auth_headers = user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in user, scope: :user
      @invite_user = User.invite!({email: "brainstormwilly@gmail.com"}) do |u|
        u.skip_invitation = true
        u.invited_by_id = user.id
      end
      invite_taster = create(:taster, user:@invite_user)
      @invite_guest_params = {
        guest:{
          tasting_id: tasting.id,
          taster_id: invite_taster.id
        }
      }
    end
    # describe "GET #showByEmail" do
    #   it "returns http success" do
    #     post :showByEmail, params: {email: encoded_user_email}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "returns guest" do
    #     post :showByEmail, params: {email: encoded_user_email}
    #     data = ActiveSupport::JSON.decode(response.body)
    #     expect(data["id"]).to eq guest.id
    #   end
    #   it "returns taster" do
    #     post :showByEmail, params: {email: encoded_user_email}
    #     data = ActiveSupport::JSON.decode(response.body)
    #     expect(data["taster"]["name"]).to eq taster.name
    #   end
    #   it "returns user" do
    #     post :showByEmail, params: {email: encoded_user_email}
    #     data = ActiveSupport::JSON.decode(response.body)
    #     expect(data["taster"]["user"]["email"]).to eq user.email
    #   end
    #   it "returns false when user not found" do
    #     post :showByEmail, params: {email: "no@noemail.com"}
    #     data = ActiveSupport::JSON.decode(response.body)
    #     expect(data).to be_falsey
    #   end
    # end
    describe "POST #inviteNewUser" do
      it 'sends email' do
        expect { post :inviteNewUser, params: @invite_guest_params }
          .to change {ActionMailer::Base.deliveries.count}.by(1)
      end
      it 'returns email' do
        post :inviteNewUser, params: @invite_guest_params
        data = ActiveSupport::JSON.decode(response.body)
        expect(data['taster']['user']['email']).to eq "brainstormwilly@gmail.com"
      end
      it 'returns raw_invitation_token' do
        post :inviteNewUser, params: @invite_guest_params
        data = ActiveSupport::JSON.decode(response.body)
        expect(data['taster']['user']['raw_invitation_token']).to eq @invite_user.raw_invitation_token
      end
    end
  end

end
