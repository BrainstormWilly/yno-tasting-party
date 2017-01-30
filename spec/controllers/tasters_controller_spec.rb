require 'rails_helper'

RSpec.describe TastersController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }

  let(:update_attrs){ {name:"John Doe", handle:"JD"} }
  let(:create_attrs){ {name:"John Doe", handle:"JD", user_id: user.id} }

  context "Taster CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end

    # describe "GET #index" do
    #   it "returns http success" do
    #     get :index
    #     expect(response).to have_http_status(:success)
    #   end
    # end

    describe "PUT #update" do
      it "returns updates taster" do
        put :update, params: {id: taster.id, taster: update_attrs}
        instance = assigns(:taster)
        expect(instance.name).to eq update_attrs[:name]
        expect(instance.handle).to eq update_attrs[:handle]
      end
      it "redirects to root" do
        put :update, params: {id: taster.id, taster: update_attrs}
        expect(response).to redirect_to(authenticated_root_path)
      end
    end

    describe "GET #new" do
      it "returns http success" do
        get :new
        expect(response).to have_http_status(:success)
      end
      it "renders #new template" do
        get :new
        expect(response).to render_template(:new)
      end
    end

    describe "POST #create" do
      it "creates new taster" do
        expect{ post :create, params: {taster: create_attrs} }.to change(Taster, :count).by(1)
      end
      it "redirects to root" do
        post :create, params: {taster: create_attrs}
        expect(response).to redirect_to(authenticated_root_path)
      end
    end

    describe "DELETE #destroy" do
      it "it deletes taster" do
        delete :destroy, params: {id: taster.id}
        count = Taster.where({id: taster.id}).size
        expect(count).to eq 0
      end
      it "redirects to root" do
        delete :destroy, params: {id: taster.id}
        expect(response).to redirect_to( authenticated_root_path )
      end
    end

  end

end
