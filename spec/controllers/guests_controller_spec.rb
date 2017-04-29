require 'rails_helper'

RSpec.describe GuestsController, type: :controller do

  let(:user){ create(:user) }
  let(:user2){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:taster2){ create(:taster, user: user2) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:tasting){ create(:tasting, host: host, location: location) }
  let!(:guest){ create(:guest, tasting: tasting, taster: taster, invited: Time.current) }
  let(:wine){ create(:wine) }
  let!(:tasting_wine){ create(:tasting_wine, tasting:tasting, wine:wine) }
  let!(:wine_review){ create(:wine_review, tasting:tasting, taster:taster)}
  let(:create_params){{
    guest: {
      tasting_id: tasting.id,
      taster_id: taster2.id
  }}}
  let(:user_params){{
    email: Faker::Internet.email
  }}


  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "GET #new" do
      it "returns http success" do
        get :new, params:{tasting_id:tasting.id}
        expect(response).to have_http_status(:success)
      end
      it "creates new @guest" do
        get :new, params:{tasting_id:tasting.id}
        expect(assigns(:guest)).to be_a_new(Guest)
      end
      it "assigns @tasting" do
        get :new, params:{tasting_id:tasting.id}
        expect(assigns(:tasting)).to eq(tasting)
      end
      it "renders #new template" do
        get :new, params:{tasting_id:tasting.id}
        expect(response).to render_template :new
      end
    end
    describe "POST #create" do
      it "adds new taster to tasting" do
        expect {
          post :create, params: create_params
        }.to change(Guest, :count).by(1)
      end
      it "adds wine review for new taster" do
        expect {
          post :create, params: create_params
        }.to change(WineReview, :count).by(1)
      end
      it "redirects to #edit tasting" do
        post :create, params: create_params
        expect(response).to redirect_to edit_tasting_path(tasting)
      end
    end
    describe "PUT #confirm" do
      it "assigns @guest" do
        put :confirm, params: {id: guest.id}
        expect(assigns(:guest)).to eq guest
      end
      it "confirms @guest" do
        put :confirm, params: {id: guest.id}
        instance = assigns(:guest)
        expect(instance.confirmed).not_to be_nil
      end
      it "redirects to Tasting#show" do
        put :confirm, params: {id: guest.id}
        expect(response).to redirect_to tasting_path(tasting)
      end
    end
    describe "PUT #existing_invite" do
      before do
        user = create(:user)
        @invite_taster = create(:taster, user: user)
      end
      it "assigns @tasting" do
        put :existing_invite, params: {tasting_id: tasting.id, taster_id: @invite_taster.id}
        expect(assigns(:tasting)).to eq tasting
      end
      it "assigns @taster" do
        put :existing_invite, params: {tasting_id: tasting.id, taster_id: @invite_taster.id}
        expect(assigns(:taster)).to eq @invite_taster
      end
      it "creates @guest" do
        put :existing_invite, params: {tasting_id: tasting.id, taster_id: @invite_taster.id}
        expect(assigns(:guest)).to eq Guest.last
      end
      it "sets @guest.invite" do
        put :existing_invite, params: {tasting_id: tasting.id, taster_id: @invite_taster.id}
        instance = assigns(:guest)
        expect(instance.invited).not_to be_nil
      end
      it "redirects to Guest#new" do
        put :existing_invite, params: {tasting_id: tasting.id, taster_id: @invite_taster.id}
        expect(response).to redirect_to tasting_guests_new_path(tasting)
      end
    end
    describe "POST #new_invite" do
      it "assigns @tasting" do
        put :new_invite, params: {user: user_params, tasting_id: tasting.id}
        expect(assigns(:tasting)).to eq tasting
      end
      it "assigns @user" do
        put :new_invite, params: {user: user_params, tasting_id: tasting.id}
        expect(assigns(:user)).to be_a User
      end
      it "assigns @taster" do
        put :new_invite, params: {user: user_params, tasting_id: tasting.id}
        expect(assigns(:taster)).to be_a Taster
      end
      it "assigns @guest" do
        put :new_invite, params: {user: user_params, tasting_id: tasting.id}
        expect(assigns(:guest)).to be_a Guest
      end
      it "redirects to Guest#new" do
        put :new_invite, params: {user: user_params, tasting_id: tasting.id}
        expect(response).to redirect_to tasting_guests_new_path(tasting)
      end
    end
    describe "PUT #create_and_confirm" do
      before do
        confirm_user = create(:user)
        @confirm_taster = create(:taster, user: confirm_user)
      end
      it "assigns @tasting" do
        put :create_and_confirm, params: {tasting_id: tasting.id, taster_id: @confirm_taster.id}
        expect(assigns(:tasting)).to eq tasting
      end
      it "assigns @taster" do
        put :create_and_confirm, params: {tasting_id: tasting.id, taster_id: @confirm_taster.id}
        expect(assigns(:taster)).to eq @confirm_taster
      end
      it "assigns @guest" do
        put :create_and_confirm, params: {tasting_id: tasting.id, taster_id: @confirm_taster.id}
        expect(assigns(:guest)).to be_a Guest
      end
      it "confirms @guest" do
        put :create_and_confirm, params: {tasting_id: tasting.id, taster_id: @confirm_taster.id}
        instance = assigns(:guest)
        expect(instance.confirmed).not_to be_nil
      end
      it "adds WineReview for @guest" do
        expect {
          put :create_and_confirm, params: {tasting_id: tasting.id, taster_id: @confirm_taster.id}
        }.to change(WineReview, :count).by(1)
      end
      it "redirects to Tasting#edit" do
        put :create_and_confirm, params: {tasting_id: tasting.id, taster_id: @confirm_taster.id}
        expect(response).to redirect_to edit_tasting_path(tasting)
      end
    end
    describe "DELETE #destroy" do
      it "deletes guest" do
        delete :destroy, params: {id: guest.id}
        cnt = Guest.where(id: guest.id).count
        expect(cnt).to eq 0
      end
      it "deletes guest's wine reviews" do
        delete :destroy, params: {id: guest.id}
        cnt = WineReview.where(tasting:tasting, taster:taster).count
        expect(cnt).to eq 0
      end
      it "redirects to #edit tasting" do
        delete :destroy, params: {id: guest.id}
        expect(response).to redirect_to edit_tasting_path(tasting)
      end
    end
  end

end
