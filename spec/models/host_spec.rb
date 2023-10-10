require 'rails_helper'

RSpec.describe Host, type: :model do

  let!(:user){ create(:user) }
  let!(:taster){ create(:taster, user:) }
  let!(:host){ create(:host, taster:) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host:, location:) }
  let!(:connect_user){ create(:user, invited_by_id: user.id) }
  let!(:connect_taster){ create(:taster, user: connect_user) }
  let!(:connection){ create(:connection, host:, taster:, connected_at: Time.now.utc)}

  describe "attributes" do
    it "should have taster, amazon_id attributes" do
      expect(host).to have_attributes(taster: host.taster, amazon_id: host.amazon_id)
    end
  end

  describe "host_locations" do
    it "should have host_locations" do
      expect(host.host_locations).to eq [host_location]
    end
  end

  describe "primary location" do
    it "should have primary_location set to primary host_location.location" do
      location2 = create(:location)
      host_location2 = create(:host_location, host:, location: location2, primary: true)
      expect(host.primary_location).to eq location2
    end
  end

  describe "connections" do
    it "have a connection" do
      expect(host.connections).to eq [connection]
    end
  end
end
