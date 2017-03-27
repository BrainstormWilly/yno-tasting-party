require 'rails_helper'

RSpec.describe Host, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:host_location){ create(:host_location, host: host, location: location) }

  it { is_expected.to validate_presence_of(:phone) }
  it { is_expected.to validate_length_of(:phone).is_at_least(10) }

  describe "attributes" do
    it "should have taster, phone attributes" do
      expect(host).to have_attributes(phone: host.phone, taster: host.taster)
    end
  end

  describe "associations" do
    it "should have host_locations" do
      expect(host.host_locations).to eq [host_location]
    end
  end

  describe "primary location" do
    it "should have primary_location set to primary host_location.location" do
      location2 = create(:location)
      host_location2 = create(:host_location, host: host, location: location2)
      expect(host.primary_location).to eq location2
    end
  end
end
