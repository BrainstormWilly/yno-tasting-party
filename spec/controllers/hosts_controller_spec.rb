require 'rails_helper'

RSpec.describe HostsController, type: :controller do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }

  let(:update_attrs){ {phone: "555-555-5555"} }
  let(:create_attrs){ {phone: "555-555-5555", taster_id: taster.id} }

  context "Host CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    describe "GET #new" do
      it "returns http success" do
        get :new
        expect(response).to have_http_status(:success)
      end
      it "render #new template" do
        get :new
        expect(response).to render_template(:new)
      end
      it "assigns a new host as @host" do
        get :new
        expect(assigns(:host)).to be_a_new(Host)
      end
    end
    describe "PUT #update" do
      it "updates host" do
        put :update, params: {id: host.id, host: update_attrs}
        instance = assigns(:host)
        expect(instance.phone).to eq update_attrs[:phone]
      end
      it "redirects to root" do
        put :update, params: {id: host.id, host: update_attrs}
        expect(response).to redirect_to(authenticated_root_path)
      end
    end
    describe "POST #create" do
      it "creates new host" do
        expect{ post :create, params: {host: create_attrs} }.to change(Host, :count).by(1)
      end
      it "redirects to root" do
        post :create, params: {host: create_attrs}
        expect(response).to redirect_to(authenticated_root_path)
      end
    end
  end

end
