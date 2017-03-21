require 'rails_helper'

RSpec.describe Location, type: :model do

  let(:location){ create(:location) }

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


end
