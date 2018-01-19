require 'rails_helper'

RSpec.describe HostLocation, type: :model do

  let!(:user){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host: host, location: location) }

  describe "attributes" do
    it "should have host, location, and primary attributes" do
      expect(host_location).to have_attributes(host: host_location.host, location: host_location.location, primary: host_location.primary)
    end
  end

  describe "primary defaults" do
    context "for initial host location" do
      it "should default primary to true" do
        expect(host_location.primary).to be_truthy
      end
    end
    context "for multi host_locations" do
      before do
        new_location = create(:location)
        @new_host_location = create(:host_location, host: host, location: new_location, primary: true)
        host_location.reload
      end
      it "sets other host_location primaries to false when new host_location is created " do
        expect(@new_host_location.primary?).to be_truthy
        expect(host_location.primary?).to be_falsey
      end
      it "sets other host location primaries to false when current host_location is set to primary" do
        host_location.update!(primary: true)
        @new_host_location.reload
        expect(@new_host_location.primary?).to be_falsey
        expect(host_location.primary?).to be_truthy
      end
      it "sets other host location primary to true when primary host_location is destroyed" do
        @new_host_location.destroy
        host_location.reload
        expect(host_location.primary?).to be_truthy
      end
    end
  end


end
