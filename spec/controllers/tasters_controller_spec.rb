require 'rails_helper'

RSpec.describe TastersController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }
  # let(:tasting_taster){ create(:tasting_taster, tasting: tasting, taster: taster) }
  let(:update_attrs){ {name:"John Doe", handle:"JD"} }
  let(:create_attrs){ {name:"John Doe", handle:"JD", user_id: user.id} }

  context "Taster only CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "GET #show" do
      it "returns http success" do
        get :show, params: {id: taster.id}
        expect(response).to have_http_status :success
      end
      it "assigns @taster" do
        get :show, params: {id: taster.id}
        expect(assigns(:taster)).to eq taster
      end
      it "renders #show template" do
        get :show, params: {id: taster.id}
        expect(response).to render_template :show
      end
    end
    describe "GET #edit" do
      it "returns http success" do
        get :edit, params: {id: taster.id}
        expect(response).to have_http_status :success
      end
      it "renders #edit template" do
        get :edit, params: {id: taster.id}
        expect(response).to render_template :edit
      end
      it "assigns @taster" do
        get :edit, params: {id: taster.id}
        expect(assigns(:taster)).to eq taster
      end
    end
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
    # describe "GET #new" do
    #   it "returns http success" do
    #     get :new
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "renders #new template" do
    #     get :new
    #     expect(response).to render_template(:new)
    #   end
    # end
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
  end # END TASTER ONLY CRUD

  # context "Host Tasting Taster CRUD" do
  #   before do
  #     @request.env["devise.mapping"] = Devise.mappings[:user]
  #     sign_in user, scope: :user
  #
  #   end
  #   describe "GET #new" do
  #     it "returns http success" do
  #       get :new, params:{tasting_id:tasting.id}
  #       expect(response).to have_http_status(:success)
  #     end
  #     it "creates new @taster" do
  #       get :new, params:{tasting_id:tasting.id}
  #       expect(assigns(:taster)).to be_a_new(Taster)
  #     end
  #     it "assigns @tasting" do
  #       get :new, params:{tasting_id:tasting.id}
  #       expect(assigns(:tasting)).to eq(tasting)
  #     end
  #     it "renders #new_tasting_taster template" do
  #       get :new, params:{tasting_id:tasting.id}
  #       expect(response).to render_template :new_tasting_taster
  #     end
  #   end
  #   describe "POST #create" do
  #     before do
  #       @user2 = create(:user)
  #     end
  #     it "adds new @taster" do
  #       # changes by 2 including user, user2
  #       expect{
  #         post :create,
  #         params: {
  #           tasting_id: tasting.id,
  #           taster: {
  #             name: "John Doe",
  #             handle: "JD",
  #             user_id: @user2.id
  #           }
  #         }
  #       }.to change(Taster, :count).by(2)
  #     end
  #     it "adds new @tasting_taster" do
  #       expect{
  #         post :create,
  #         params: {
  #           tasting_id: tasting.id,
  #           taster: {
  #             name: "John Doe",
  #             handle: "JD",
  #             user_id: @user2.id
  #           }
  #         }
  #       }.to change(TastingTaster, :count).by(1)
  #     end
  #     it "redirects to #edit tasting" do
  #       post :create,
  #       params: {
  #         tasting_id: tasting.id,
  #         taster: {
  #           name: "John Doe",
  #           handle: "JD",
  #           user_id: @user2.id
  #         }
  #       }
  #       expect(response).to redirect_to(edit_tasting_path(tasting))
  #     end
  #   end
  #   # describe "DELETE #destroy" do
  #   #   before do
  #   #     @taster_tasting = create(:taster_tasting, tasting_id: tasting.id, taster_id: taster.id)
  #   #   end
  #   #   it "deletes @tasting_taster" do
  #   #     expect{
  #   #       delete :destroy, params:{tasting_id:tasting.id, taster}
  #   #     }.to change(TastingTaster, :count).by(1)
  #   #   end
  #   # end
  # end # END HOST TASTING TASTER CRUD

end
