require 'rails_helper'

RSpec.describe TastingWinesController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }
  let(:wine){ create(:wine) }
  let(:tasting_wine){ create(:tasting_wine, tasting: tasting, wine: wine) }

  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "GET #index" do
      it "returns http success" do
        get :index, params:{tasting_id: tasting.id}
        expect(response).to have_http_status(:success)
      end
      it "assigns @tasting_wines" do
        get :index, params:{tasting_id: tasting.id}
        expect( assigns(:tasting_wines) ).to eq([tasting_wine])
      end
      it "renders #index template" do
        get :index, params:{tasting_id: tasting.id}
        expect(response).to render_template(:index)
      end
    end
    describe "GET #show" do
      it "returns http success" do
        get :show, params:{tasting_id: tasting.id, id:tasting_wine.id}
        expect(response).to have_http_status(:success)
      end
      it "assigns @tasting_wine" do
        get :show, params:{tasting_id: tasting.id, id:tasting_wine.id}
        expect( assigns(:tasting_wine) ).to eq(tasting_wine)
      end
      it "renders #show template" do
        get :show, params:{tasting_id: tasting.id, id:tasting_wine.id}
        expect(response).to render_template(:show)
      end
    end
    describe "GET #new" do
      it "returns http success" do
        get :new, params:{tasting_id:tasting.id}
        expect(response).to have_http_status(:success)
      end
      it "creates new @tasting_wine" do
        get :new, params:{tasting_id:tasting.id}
        expect(assigns(:tasting_wine)).to be_a_new(TastingWine)
      end
      it "renders #new template" do
        get :new, params:{tasting_id:tasting.id}
        expect(response).to render_template(:new)
      end
    end
    describe "POST #create" do
      it "creates @tasting_wine" do
        w = create(:wine);
        tw_params = {tasting_id:tasting.id, wine_id:w.id}
        expect {
          post :create, params: {tasting_id: tasting.id, tasting_wine: tw_params}
        }.to change(TastingWine, :count).by(1)
      end
      it "redirects to tasting#show" do
        w = create(:wine);
        tw_params = {tasting_id:tasting.id, wine_id:w.id}
        post :create, params: {tasting_id: tasting.id, tasting_wine: tw_params}
        expect(response).to redirect_to(tasting_path(tasting.id))
      end
    end
    describe "DELETE #destroy" do
      it "deletes @tasting_wine" do
        delete :destroy, params: {tasting_id: tasting.id, id:tasting_wine.id}
        count = TastingWine.where(id:tasting_wine.id).count
        expect(count).to eq 0
      end
      it "redirects to tasting#show" do
        delete :destroy, params: {tasting_id: tasting.id, id:tasting_wine.id}
        expect(response).to redirect_to(tasting_path(tasting.id))
      end
    end
  end # END HOST CRUD

end
