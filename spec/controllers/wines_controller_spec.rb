require 'rails_helper'

RSpec.describe WinesController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }
  let(:wine){ create(:wine) }
  let(:tasting_wine){ create(:tasting_wine, tasting: tasting, wine: wine) }

  context "Tasting Wine Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "GET #new" do
      it "returns http success" do
        get :new, params: {tasting_id: tasting.id}
        expect(response).to have_http_status(:success)
      end
      it "assigns @wine" do
        get :new, params: {tasting_id: tasting.id}
        expect(assigns(:wine)).to be_a_new(Wine)
      end
      it "assigns @tasting" do
        get :new, params: {tasting_id: tasting.id}
        expect(assigns(:tasting)).to eq(tasting)
      end
      it "renders #new template" do
        get :new, params: {tasting_id: tasting.id}
        expect(response).to render_template(:new)
      end
    end

    describe "POST #create" do
      it "adds @wine" do
        expect{
          post :create, params: {tasting_id: tasting.id, wine: {
            name: "My New Wine",
            vintage: 2014,
            price: 24.99
          }}
        }.to change(Wine, :count).by(1)
      end
      it "adds @tasting_wine" do
        expect{
          post :create, params: {tasting_id: tasting.id, wine: {
            name: "My New Wine",
            vintage: 2014,
            price: 24.99
          }}
        }.to change(TastingWine, :count).by(1)
      end
      it "redirects to @tasting #edit" do
        post :create, params: {tasting_id: tasting.id, wine: {
          name: "My New Wine",
          vintage: 2014,
          price: 24.99
        }}
        expect(response).to redirect_to(edit_tasting_path(tasting))
      end
    end

    describe "DELETE #destroy" do
      it "deletes @wine" do
        delete :destroy, params: {tasting_id:tasting.id, id:wine.id}
        cnt = Wine.where(id: wine.id).count
        expect(cnt).to eq 0
      end
      it "deletes @tasting_wine" do
        delete :destroy, params: {tasting_id:tasting.id, id:wine.id}
        cnt = TastingWine.where(tasting_id:tasting.id, wine_id: wine.id).count
        expect(cnt).to eq 0
      end
      it "redirects to @tasting #edit" do
        delete :destroy, params: {tasting_id:tasting.id, id:wine.id}
        expect(response).to redirect_to(edit_tasting_path(tasting))
      end
    end
  end

end
