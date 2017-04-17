require 'rails_helper'

RSpec.describe Taster, type: :model do

  let(:user) { create(:user) }
  let(:taster) { create(:taster, user: user) }

  # it { is_expected.to validate_presence_of(:name) }
  # it { is_expected.to validate_length_of(:name).is_at_least(1) }

  describe "attributes" do
    it "should have name, user, status attributes" do
      expect(taster).to have_attributes(name: taster.name, user: taster.user, status: taster.status)
    end
  end

  describe "status" do
    it "should default status to 'pending'" do
      expect(taster.status).to eq "pending"
    end
    it "should respond to pending?" do
      expect(taster.pending?).to be_truthy
    end
    it "should respond to active?" do
      expect(taster.active?).to be_falsey
    end
    it "should respond to inactive?" do
      expect(taster.inactive?).to be_falsey
    end
  end


end
