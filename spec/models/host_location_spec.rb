require 'rails_helper'

RSpec.describe HostLocation, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:host_location){ create(:host_location, host: host, location: location) }

  describe "attributes" do
    it "should have host, location, and primary attributes" do
      expect(host_location).to have_attributes(host: host_location.host, location: host_location.location, primary: host_location.primary)
    end
  end

end
