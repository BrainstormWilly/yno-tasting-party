require 'rails_helper'

RSpec.describe Tasting, type: :model do

  let(:tasting){ create(:tasting) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_least(1) }
  it { is_expected.to validate_presence_of(:open_at) }

  describe "attributes" do
    it "should have name, description, open_at, and close_at attributes" do
      expect(tasting).to have_attributes(name: tasting.name, description: tasting.description, open_at: tasting.open_at, close_at: tasting.close_at)
    end
  end

  describe "private" do
    it "should respond to private?" do
      expect(tasting).to respond_to(:private?)
    end
    it "should default private to falsey" do
      expect(tasting.private).to be_falsey
    end
  end

end
