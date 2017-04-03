require 'rails_helper'

RSpec.describe WinesController, type: :controller do

  let!(:user){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:tasting){ create(:tasting, host: host, location: location) }
  let!(:wine){ create(:wine) }
  let!(:tasting_wine){ create(:tasting_wine, tasting: tasting, wine: wine) }

  let(:create_params){ {wine: {name: "My New Wine", vintage: 2014, price: 24.99}} }

  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    # describe "GET #new" do
    #   it "assigns @wine" do
    #     get :new
    #     expect(assigns(:wine)).to be_a_new(Wine)
    #   end
    # end
    describe "POST #create" do
      it "adds @wine" do
        expect{
          post :create, params: create_params
        }.to change(Wine, :count).by(1)
      end
      it "redirects to @tasting #edit" do
        post :create, params: create_params
        expect(response).to redirect_to authenticated_root_path
      end
    end
    describe "DELETE #destroy" do
      context "has no tasting wines" do
        before do
          tasting_wine.destroy
        end
        it "deletes @wine" do
          delete :destroy, params: {id:wine.id}
          cnt = Wine.where(id: wine.id).count
          expect(cnt).to eq 0
        end
        it "redirects to @tasting #edit" do
          delete :destroy, params: {tasting_id:tasting.id, id:wine.id}
          expect(response).to redirect_to authenticated_root_path
        end
      end
      context "has tasting wines" do
        it "does not delete @wine" do
          delete :destroy, params: {id:wine.id}
          cnt = Wine.where(id: wine.id).count
          expect(cnt).to eq 1
        end
        it "redirects to @tasting #edit" do
          delete :destroy, params: {tasting_id:tasting.id, id:wine.id}
          expect(response).to redirect_to authenticated_root_path
        end
      end
    end
  end

end
