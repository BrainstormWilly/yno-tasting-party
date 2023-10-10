require 'rails_helper'

RSpec.describe Location, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user:) }
  let(:host){ create(:host, taster:) }
  let(:location){ create(:location) }
  let(:host_location){ create(:host_location, location:, host:) }

  describe "attributes" do
    it "should have 7 attributes" do
      expect(location).to have_attributes(
        phone: location.phone,
        address: location.address,
        address2: location.address2,
        city: location.city,
        state: location.state,
        postal: location.postal,
        country: location.country
      )
    end
  end

  describe "associations" do
    it "should have host_locations" do
      expect(location.host_locations).to eq [host_location]
    end
  end
end
