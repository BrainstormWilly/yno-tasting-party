require 'rails_helper'

RSpec.describe Guest, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:tasting){ create(:tasting, host: host, location: location) }
  let(:guest){ create(:guest, tasting: tasting, taster: taster) }

  it { is_expected.to validate_presence_of(:taster_id) }
  it { is_expected.to validate_presence_of(:tasting_id) }

  describe "attributes" do
    it "should have taster, tasting, confirmed attributes" do
      expect(guest).to have_attributes(taster: guest.taster, tasting: guest.tasting, confirmed: guest.confirmed)
    end
    it "should respond to confirmed?" do
      expect(guest).to respond_to :confirmed?
    end
    it "should default confirmed to false" do
      expect(guest.confirmed?).to be_falsey
    end
  end

end
