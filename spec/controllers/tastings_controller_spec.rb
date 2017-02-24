require 'rails_helper'


RSpec.describe TastingsController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }
  let(:create_attributes) {
    {name: "My Tasting", open_at:1.hour.from_now, close_at:3.hours.from_now, host_id: host.id}
  }
  let(:update_attributes) {
    {name: "My Updated Tasting"}
  }

  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "GET #index" do
      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
      it "assigns public tastings as @public_tastings" do
        public_tasting = create(:tasting, private: false, host: host)
        get :index
        expect(assigns(:public_tastings)).to eq([public_tasting])
      end
      it "renders #index template" do
        get :index
        expect(response).to render_template(:index)
      end
    end
    describe "GET #show" do
      it "returns http success" do
        get :show, params: {id: tasting.id}
        expect(response).to have_http_status(:success)
      end
      it "assigns @tasting" do
        get :show, params: {id: tasting.id}
        expect(assigns(:tasting)).to eq(tasting)
      end
      it "renders #show template" do
        get :show, params: {id: tasting.id}
        expect(response).to render_template(:show);
      end
    end
    describe "GET #new" do
      it "returns http success" do
        get :new
        expect(response).to have_http_status(:success)
      end
      it "assigns new @tasting" do
        get :new
        expect(assigns(:tasting)).to be_a_new(Tasting)
      end
      it "renders #new template" do
        get :new
        expect(response).to render_template(:new);
      end
    end
    describe "GET #edit" do
      it "returns http success" do
        get :edit, params: {id: tasting.id}
        expect(response).to have_http_status(:success)
      end
      it "assigns the requested tasting as @tasting" do
        get :edit, params: {id: tasting.id}
        expect(assigns(:tasting)).to eq(tasting)
      end
      it "renders #edit template" do
        get :edit, params: {id: tasting.id}
        expect(response).to render_template(:edit);
      end
    end
    describe "POST #create" do
      it "creates a new Tasting" do
        expect {
          post :create, params: {tasting: create_attributes}
        }.to change(Tasting, :count).by(1)
      end
      it "redirects to Tasting#edit" do
        post :create, params: {tasting: create_attributes}
        expect(response).to redirect_to edit_tasting_path(Tasting.last)
      end
    end
    describe "PUT #update" do
      it "updates @tasting" do
        put :update, params: {id: tasting.id, tasting: update_attributes}
        instance = assigns(:tasting)
        expect(instance.name).to eq "My Updated Tasting"
      end
      it "redirects to the tasting" do
        put :update, params: {id: tasting.id, tasting: update_attributes}
        instance = assigns(:tasting)
        expect(response).to redirect_to edit_tasting_path(tasting)
      end
    end
    describe "PUT #close" do
      it "assigns @tasting" do
        put :close, params: {id: tasting.id}
        expect(assigns(:tasting)). to eq tasting
      end
      it "closes @tasting" do
        put :close, params: {id: tasting.id}
        instance = assigns(:tasting)
        expect(instance.closed_at).not_to be_nil
      end
      it "redirects to Tasting#show" do
        put :close, params: {id: tasting.id}
        expect(response).to redirect_to tasting_path(tasting)
      end
    end
    describe "DELETE #destroy" do
      before do
        wine = create(:wine)
        @guest = create(:guest, tasting: tasting, taster: taster)
        @tasting_wine = create(:tasting_wine, tasting: tasting, wine: wine)
        @wine_review = create(:wine_review, tasting: tasting, taster: taster, wine: wine)
      end
      it "destroys @tasting" do
        expect {
          delete :destroy, params: {id: tasting.id}
        }.to change(Tasting, :count).by(-1)
      end
      it "destroys @tasting.guests" do
        delete :destroy, params: {id: tasting.id}
        cnt = Guest.where(id: @guest.id).count
        expect(cnt).to eq 0
      end
      it "destroys @tasting.tasting_wines" do
        delete :destroy, params: {id: tasting.id}
        cnt = TastingWine.where(id: @tasting_wine.id).count
        expect(cnt).to eq 0
      end
      it "destroys @tasting.wine_reviews" do
        delete :destroy, params: {id: tasting.id}
        cnt = WineReview.where(id: @wine_review.id).count
        expect(cnt).to eq 0
      end
      it "redirects to the tastings list" do
        delete :destroy, params: {id: tasting.id}
        expect(response).to redirect_to(authenticated_root_path)
      end
    end
  end # HOST CRUD

end
