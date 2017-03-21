require 'rails_helper'

RSpec.describe WineReviewsController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:wine){ create(:wine) }
  let(:tasting){ create(:tasting, host:host, open_at: Time.current) }
  let(:wine_review){ create(:wine_review, tasting: tasting, taster: taster) }

  context "WineReview Taster CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    # describe "GET #show" do
    #   it "returns http success" do
    #     get :show, params: {tasting_id: tasting.id, id: wine_review.id}
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "assigns @wine_review" do
    #     get :show, params: {tasting_id: tasting.id, id: wine_review.id}
    #     expect(assigns(:wine_review)).to eq wine_review
    #   end
    #   it "renders #show template" do
    #     get :show, params: {tasting_id: tasting.id, id: wine_review.id}
    #     expect(response).to render_template :show
    #   end
    # end
    describe "GET #edit" do
      it "returns http success" do
        get :edit, params: {id: wine_review.id}
        expect(response).to have_http_status(:success)
      end
      it "assigns @wine_review" do
        get :edit, params: {id: wine_review.id}
        expect(assigns(:wine_review)).to eq wine_review
      end
      it "renders #show template" do
        get :edit, params: {id: wine_review.id}
        expect(response).to render_template :edit
      end
    end
    describe "PUT #update" do
      it "updates @wine_review" do
        put :update, params: {id: wine_review.id, wine_review:{rating: 5}}
        instance = assigns(:wine_review)
        expect(instance.rating).to eq 5
      end
      it "redirect to Tasting#show" do
        put :update, params: {id: wine_review.id, wine_review:{rating: 5}}
        expect(response).to redirect_to tasting_path(wine_review.tasting)
      end
    end
    # describe "POST #create" do
    #   it "creates @wine_review" do
    #     expect{
    #       post :create, params: {wine_review:{
    #         tasting_id: tasting.id,
    #         taster_id: taster.id,
    #         wine_id: wine.id,
    #         rating: 3,
    #         comments: "a;kdfj a;fj a;fj ;j;adfj "
    #       }}
    #     }.to change(WineReview, :count).by 1
    #   end
    #   it "redirects to Tasting#show" do
    #     post :create, params: {wine_review:{
    #       tasting_id: tasting.id,
    #       taster_id: taster.id,
    #       wine_id: wine.id,
    #       rating: 3,
    #       comments: "a;kdfj a;fj a;fj ;j;adfj "
    #     }}
    #     expect(response).to redirect_to tasting_path(tasting)
    #   end
    # end
    # describe "DELETE #destroy" do
    #   it "deletes @wine_review" do
    #     delete :destroy, params: {id: wine_review.id}
    #     cnt = WineReview.where(id: wine_review.id).count
    #     expect(cnt).to eq 0
    #   end
    #   it "redirects to Tasting#show" do
    #     delete :destroy, params: {id: wine_review.id}
    #     expect(response).to redirect_to tasting_path(wine_review.tasting_id)
    #   end
    # end
  end # END WINEREVIEW TASTER CRUD

end
