require 'rails_helper'

RSpec.describe Taster, type: :model do

  let(:user) { create(:user) }
  let(:taster) { create(:taster, user: user) }

  # it { is_expected.to validate_presence_of(:name) }
  # it { is_expected.to validate_length_of(:name).is_at_least(1) }

  describe "attributes" do
    it "should have name, user attributes" do
      expect(taster).to have_attributes(name: taster.name, user: taster.user)
    end
  end

end
