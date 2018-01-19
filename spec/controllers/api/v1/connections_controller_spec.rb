require "rails_helper"

RSpec.describe Api::V1::ConnectionsController, type: :controller do

  let!(:other_host_user){ create(:user) }
  let!(:other_host_taster){ create(:taster, user:other_host_user) }
  let!(:other_host){ create(:host, taster:other_host_taster) }
  let!(:host_user){ create(:user, invited_by_id:other_host_user.id) }
  let!(:host_taster){ create(:taster, user:host_user) }
  let!(:other_connection){ create(:connection, host_id:other_host.id, taster:host_taster, connected_at:Time.current) }
  let!(:host){ create(:host, taster:host_taster) }
  let!(:taster_user){ create(:user, invited_by_id:host_user.id) }
  let!(:taster_taster){ create(:taster, user:taster_user) }
  let!(:connection){ create(:connection, host_id:host.id, taster_id:taster_taster.id, connected_at:Time.current) }

  # let!(:random_connection){ create(:connection, host_id:100, taster_id:taster_taster.id, connected_at:Time.current) }

  context "Guest request" do
    describe "GET #index" do
      it "returns http unauthorized" do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  context "Taster request" do
    before do
      auth_headers = taster_user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in taster_user, scope: :user
    end
    describe "GET #index" do
      it "returns http forbidden" do
        get :index
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  context "Host request" do
    before do
      auth_headers = host_user.create_new_auth_token
      @request.headers.merge(auth_headers)
      sign_in host_user, scope: :user
    end
    describe "GET #index" do
      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
      it "returns 1 connection" do
        get :index
        data = ActiveSupport::JSON.decode(response.body)
        expect(data.count).to eq 2
      end
    end
  end


end
