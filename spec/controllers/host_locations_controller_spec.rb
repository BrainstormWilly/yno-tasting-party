require 'rails_helper'

RSpec.describe HostLocationsController, type: :controller do

  let!(:user){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host: host, location: location) }

  let(:create_attributes){
    {
      host_id: host.id,
      location_id: location.id
    }
  }

  context "Host only CRUD" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user, scope: :user
    end
    # describe "GET #new" do
    #   it "returns http success" do
    #     get :new
    #     expect(response).to have_http_status(:success)
    #   end
    #   it "creates new @host_location" do
    #     get new
    #     expect(assigns(:host_location)).to be_a_new HostLocation
    #   end
    # end
    describe "PUT #set_as_primary" do
      before do
        new_location = create(:location)
        @new_host_location = create(:host_location, host: host, location: location)
        host_location.reload
      end
      it "assigns @host_location to host_location" do
        put :set_as_primary, params: {id: host_location.id}
        expect(assigns(:host_location)).to eq host_location
      end
      it "sets @host_location.primary to true" do
        expect(host_location.primary?).to be_falsey
        put :set_as_primary, params: {id: host_location.id}
        host_location.reload
        expect(host_location.primary?).to be_truthy
      end
      it "sets @new_host_location.primary to false" do
        expect(@new_host_location.primary?).to be_truthy
        put :set_as_primary, params: {id: host_location.id}
        @new_host_location.reload
        expect(@new_host_location.primary?).to be_falsey
      end
    end

    describe "POST #create" do
      it "creates and saves @host_location" do
        expect {
          post :create, params: {host_location: create_attributes}
        }.to change(HostLocation, :count).by(1)
      end
      it "assigns a newly created host_location as @host_location" do
        post :create, params: {host_location: create_attributes}
        expect(assigns(:host_location)).to be_a(HostLocation)
        expect(assigns(:host_location)).to be_persisted
      end
      it "redirects to user#edit" do
        post :create, params: {host_location: create_attributes}
        expect(response).to redirect_to edit_user_registration_path
      end
    end

    describe "GET #destroy" do
      it "returns removes host_location" do
        expect {
          delete :destroy, params: {id: host_location.to_param}
        }.to change(HostLocation, :count).by(-1)
      end
      it "redirects to user#edit" do
        delete :destroy, params: {id: host_location.to_param}
        expect(response).to redirect_to edit_user_registration_path
      end
    end
  end # HOST ONLY CRUD

end
