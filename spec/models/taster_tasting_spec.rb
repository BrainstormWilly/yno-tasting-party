require 'rails_helper'

RSpec.describe TasterTasting, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:tasting){ create(:tasting) }
  let(:taster_tasting){ create(:taster_tasting, tasting: tasting, taster: taster) }

  it { is_expected.to validate_presence_of(:taster_id) }
  it { is_expected.to validate_presence_of(:tasting_id) }

  describe "attributes" do
    it "should have taster, tasting attributes" do
      expect(taster_tasting).to have_attributes(taster: taster_tasting.taster, tasting: taster_tasting.tasting)
    end
  end

end
