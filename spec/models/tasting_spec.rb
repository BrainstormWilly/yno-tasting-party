require 'rails_helper'

RSpec.describe Tasting, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }

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

  describe "open_at parameters" do
    it "should not be earlier than DateTime.now" do
      time = DateTime.now.prev_day
      should_not allow_value(time).for(:open_at)
    end
    it "should allow DateTime.now" do
      time = DateTime.now
      should allow_value(time).for(:open_at)
    end
    it "should allow dates in the future" do
      time = DateTime.now.next_month
      should allow_value(time).for(:open_at)
    end
  end

  # describe "close_at parameters" do
  #   it "should not be earlier than :open_at" do
  #     time = tasting.open_at.prev_day
  #     should_not allow_value(time).for(:close_at)
  #   end
  #   it "should not be equal than :open_at" do
  #     time = tasting.open_at
  #     should_not allow_value(time).for(:close_at)
  #   end
  #   it "should allow dates after :open_at" do
  #     time = tasting.open_at.next_day
  #     should allow_value(time).for(:close_at)
  #   end
  # end

end
