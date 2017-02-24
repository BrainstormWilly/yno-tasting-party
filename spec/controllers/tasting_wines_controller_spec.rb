require 'rails_helper'

RSpec.describe TastingWinesController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }
  let!(:tasting_taster){ create(:tasting_taster, tasting: tasting, taster: taster)}
  let(:wine){ create(:wine) }
  let(:tasting_wine){ create(:tasting_wine, tasting: tasting, wine: wine) }
  let(:create_wine){ create(:wine) }
  let(:create_params){ {tasting_id:tasting.id, wine_id:create_wine.id} }

  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    # describe "GET #index" do
    #   it "returns http success" do
    #     get :index, params:{tasting_id: tasting.id}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "assigns @tasting_wines" do
    #     get :index, params:{tasting_id: tasting.id}
    #     expect( assigns(:tasting_wines) ).to eq([tasting_wine])
    #   end
    #   it "renders #index template" do
    #     get :index, params:{tasting_id: tasting.id}
    #     expect(response).to render_template(:index)
    #   end
    # end
    # describe "GET #show" do
    #   it "returns http success" do
    #     get :show, params:{tasting_id: tasting.id, id:tasting_wine.id}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "assigns @tasting_wine" do
    #     get :show, params:{tasting_id: tasting.id, id:tasting_wine.id}
    #     expect( assigns(:tasting_wine) ).to eq(tasting_wine)
    #   end
    #   it "renders #show template" do
    #     get :show, params:{tasting_id: tasting.id, id:tasting_wine.id}
    #     expect(response).to render_template(:show)
    #   end
    # end
    # describe "GET #new" do
    #   it "returns http success" do
    #     get :new, params:{tasting_id:tasting.id}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "creates new @tasting_wine" do
    #     get :new, params:{tasting_id:tasting.id}
    #     expect(assigns(:tasting_wine)).to be_a_new(TastingWine)
    #   end
    #   it "renders #new template" do
    #     get :new, params:{tasting_id:tasting.id}
    #     expect(response).to render_template(:new)
    #   end
    # end
    describe "POST #create" do
      it "creates @tasting_wine" do
        expect {
          post :create, params: {tasting_id: tasting.id, tasting_wine: create_params}
        }.to change(TastingWine, :count).by(1)
      end
      it "assigns @tasting_tasters" do
        post :create, params: {tasting_id: tasting.id, tasting_wine: create_params}
        cnt = TastingTaster.where(tasting: tasting).count
        expect(cnt).to eq 1
      end
      it "creates wine review" do
        post :create, params: {tasting_id: tasting.id, tasting_wine: create_params}
        cnt = WineReview.where(tasting: tasting).count
        expect(cnt).to eq 1
      end
      it "redirects to tasting#edit" do
        post :create, params: {tasting_id: tasting.id, tasting_wine: create_params}
        expect(response).to redirect_to edit_tasting_path(tasting)
      end
    end
    describe "DELETE #destroy" do
      before do
        @wine_review = WineReview.create_next_in_sequence(tasting.id, taster.id)
        @max_wine_number = @wine_review.wine_number
      end
      context "before tasting is open" do
        it "deletes @tasting_wine" do
          delete :destroy, params: {id:tasting_wine.id}
          count = TastingWine.where(id:tasting_wine.id).count
          expect(count).to eq 0
        end
        it "deletes @tasting_wine's review" do
          delete :destroy, params: {id: tasting_wine.id}
          count = WineReview.where(wine_number: @max_wine_number).count
          expect(count).to eq 0
        end
        it "redirects to tasting#edit" do
          delete :destroy, params: {id: tasting_wine.id}
          expect(response).to redirect_to edit_tasting_path(tasting)
        end
      end
      context "after tasting is open" do
        before do
          tasting.open_at = DateTime.now
        end
        it "does not delete @tasting_wine" do
          delete :destroy, params: {id:tasting_wine.id}
          count = TastingWine.where(id:tasting_wine.id).count
          expect(count).to eq 1
        end
        it "does not delete @tasting_wine's review" do
          delete :destroy, params: {id: tasting_wine.id}
          count = WineReview.where(wine_number: @max_wine_number).count
          expect(count).to eq 1
        end
        it "redirects to tasting#edit" do
          delete :destroy, params: {id: tasting_wine.id}
          expect(response).to redirect_to edit_tasting_path(tasting)
        end
      end
    end
  end # END HOST CRUD

end
