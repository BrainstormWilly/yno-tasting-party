require 'rails_helper'

RSpec.describe TastingWinesController, type: :controller do

  let!(:user){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:tasting){ create(:tasting, host: host, location: location, open_at: Time.current) }
  let!(:guest){ create(:guest, tasting: tasting, taster: taster)}
  let!(:wine){ create(:wine) }
  let!(:tasting_wine){ create(:tasting_wine, tasting: tasting, wine: wine) }
  let(:create_wine){ create(:wine) }
  let(:create_params){ {tasting_id:tasting.id, wine_id:create_wine.id} }

  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "PUT #reveal" do
      before do
        @wine2 = create(:wine)
        @tasting_wine2 = create(:tasting_wine, tasting: tasting, wine: @wine2)
      end
      context "tasting not closed" do
        it "assigns @tasting_wine" do
          put :reveal, params: {id: tasting_wine.id, wine_number: 1}
          instance = assigns(:tasting_wine)
          expect(instance).to eq tasting_wine
        end
        it "does not set @tasting_wine wine_number" do
          put :reveal, params: {id: tasting_wine.id, wine_number: 1}
          instance = assigns(:tasting_wine)
          expect(instance.wine_number).to eq 0
        end
        it "redirects to Tasting#show" do
          put :reveal, params: {id: tasting_wine.id, wine_number: 1}
          expect(response).to redirect_to edit_tasting_path(tasting)
        end
      end
      context "tasting closed" do
        before do
          tasting.closed_at = Time.current
          tasting.save
        end
        it "assigns @tasting_wine" do
          put :reveal, params: {id: tasting_wine.id, wine_number: 1}
          instance = assigns(:tasting_wine)
          expect(instance).to eq tasting_wine
        end
        it "sets @tasting_wine wine_number" do
          put :reveal, params: {id: tasting_wine.id, wine_number: 1}
          instance = assigns(:tasting_wine)
          expect(instance.wine_number).not_to eq 0
        end
        it "does not allow 2 TastingWines to share the same wine_number" do
          put :reveal, params: {id: tasting_wine.id, wine_number: 1}
          put :reveal, params: {id: @tasting_wine2.id, wine_number: 1}
          instance = TastingWine.find(tasting_wine.id)
          expect(instance.wine_number).to eq 0
        end
        it "redirects to Tasting#edit" do
          put :reveal, params: {id: tasting_wine.id, wine_number: 1}
          expect(response).to redirect_to edit_tasting_path(tasting)
        end
      end
    end
    describe "PUT #create" do
      it "creates @tasting_wine" do
        expect {
          put :create, params: {tasting_id: tasting.id, wine_id: create_wine.id}
        }.to change(TastingWine, :count).by(1)
      end
      it "assigns @guest" do
        put :create, params: {tasting_id: tasting.id, wine_id: create_wine.id}
        cnt = Guest.where(tasting: tasting).count
        expect(cnt).to eq 1
      end
      it "creates wine review" do
        put :create, params: {tasting_id: tasting.id, wine_id: create_wine.id}
        cnt = WineReview.where(tasting: tasting).count
        expect(cnt).to eq 1
      end
      it "redirects to tasting#edit" do
        put :create, params: {tasting_id: tasting.id, wine_id: create_wine.id}
        expect(response).to redirect_to tasting_wines_new_path(tasting)
      end
    end
    describe "DELETE #destroy" do
      before do
        @wine_review = WineReview.create_next_in_sequence_for_guest(tasting, taster)
        @max_wine_number = @wine_review.wine_number
      end
      context "before tasting has reviews" do
        it "assigns @tasting_wine" do
          delete :destroy, params: {id:tasting_wine.id}
          instance = assigns(:tasting_wine)
          expect(instance).to eq tasting_wine
        end
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
      context "after tasting has review" do
        before do
          @wine_review.updated_at = 1.minute.from_now
          @wine_review.save
        end
        it "assigns @tasting_wine" do
          delete :destroy, params: {id:tasting_wine.id}
          instance = assigns(:tasting_wine)
          expect(instance).to eq tasting_wine
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
