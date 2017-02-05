require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

RSpec.describe TastingsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Tasting. As you add validations to Tasting, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    {name: "My Tasting", open_at:DateTime.now, close_at:3.hours.from_now}
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # TastingsController. Be sure to keep this updated too.
  let(:valid_session) { {} }
  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }

  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "GET #index" do
      it "returns http success" do
        tasting = create(:tasting, host: host)
        get :index
        expect(response).to have_http_status(:success)
      end
      it "assigns public tastings as @public_tastings" do
        tasting = create(:tasting, private: false, host: host)
        get :index
        expect(assigns(:public_tastings)).to eq([tasting])
      end
      it "assigns taster tastings as @taster_tastings" do
        tasting = create(:tasting, host: host)
        taster_tasting = create(:taster_tasting, tasting: tasting, taster: taster)
        get :index
        expect(assigns(:taster_tastings)).to eq([taster_tasting])
      end
      it "renders #index template" do
        tasting = create(:tasting, host: host)
        get :index
        expect(response).to render_template(:index)
      end
    end
    describe "GET #show" do
      it "returns http success" do
        tasting = create(:tasting, host: host)
        get :show, params: {id: tasting.id}
        expect(response).to have_http_status(:success)
      end
      it "assigns the requested tasting as @tasting" do
        tasting = create(:tasting, host: host)
        get :show, params: {id: tasting.id}
        expect(assigns(:tasting)).to eq(tasting)
      end
      it "renders #show template" do
        tasting = create(:tasting, host: host)
        get :show, params: {id: tasting.id}
        expect(response).to render_template(:show);
      end
    end
    describe "GET #new" do
      it "returns http success" do
        get :new
        expect(response).to have_http_status(:success)
      end
      it "assigns a new tasting as @tasting" do
        get :new
        expect(assigns(:tasting)).to be_a_new(Tasting)
      end
      it "renders #new template" do
        get :new
        expect(response).to render_template(:new);
      end
    end

    describe "GET #edit" do
      it "assigns the requested tasting as @tasting" do
        tasting = Tasting.create! valid_attributes
        get :edit, params: {id: tasting.to_param}, session: valid_session
        expect(assigns(:tasting)).to eq(tasting)
      end
    end

    describe "POST #create" do
      context "with valid params" do
        it "creates a new Tasting" do
          expect {
            post :create, params: {tasting: valid_attributes}, session: valid_session
          }.to change(Tasting, :count).by(1)
        end

        it "assigns a newly created tasting as @tasting" do
          post :create, params: {tasting: valid_attributes}, session: valid_session
          expect(assigns(:tasting)).to be_a(Tasting)
          expect(assigns(:tasting)).to be_persisted
        end

        it "redirects to the created tasting" do
          post :create, params: {tasting: valid_attributes}, session: valid_session
          expect(response).to redirect_to(Tasting.last)
        end
      end

      context "with invalid params" do
        it "assigns a newly created but unsaved tasting as @tasting" do
          post :create, params: {tasting: invalid_attributes}, session: valid_session
          expect(assigns(:tasting)).to be_a_new(Tasting)
        end

        it "re-renders the 'new' template" do
          post :create, params: {tasting: invalid_attributes}, session: valid_session
          expect(response).to render_template("new")
        end
      end
    end

    describe "PUT #update" do
      context "with valid params" do
        let(:new_attributes) {
          skip("Add a hash of attributes valid for your model")
        }

        it "updates the requested tasting" do
          tasting = Tasting.create! valid_attributes
          put :update, params: {id: tasting.to_param, tasting: new_attributes}, session: valid_session
          tasting.reload
          skip("Add assertions for updated state")
        end

        it "assigns the requested tasting as @tasting" do
          tasting = Tasting.create! valid_attributes
          put :update, params: {id: tasting.to_param, tasting: valid_attributes}, session: valid_session
          expect(assigns(:tasting)).to eq(tasting)
        end

        it "redirects to the tasting" do
          tasting = Tasting.create! valid_attributes
          put :update, params: {id: tasting.to_param, tasting: valid_attributes}, session: valid_session
          expect(response).to redirect_to(tasting)
        end
      end

      context "with invalid params" do
        it "assigns the tasting as @tasting" do
          tasting = Tasting.create! valid_attributes
          put :update, params: {id: tasting.to_param, tasting: invalid_attributes}, session: valid_session
          expect(assigns(:tasting)).to eq(tasting)
        end

        it "re-renders the 'edit' template" do
          tasting = Tasting.create! valid_attributes
          put :update, params: {id: tasting.to_param, tasting: invalid_attributes}, session: valid_session
          expect(response).to render_template("edit")
        end
      end
    end

    describe "DELETE #destroy" do
      it "destroys the requested tasting" do
        tasting = Tasting.create! valid_attributes
        expect {
          delete :destroy, params: {id: tasting.to_param}, session: valid_session
        }.to change(Tasting, :count).by(-1)
      end

      it "redirects to the tastings list" do
        tasting = Tasting.create! valid_attributes
        delete :destroy, params: {id: tasting.to_param}, session: valid_session
        expect(response).to redirect_to(tastings_url)
      end
    end
  end # Taster CRUD

end
