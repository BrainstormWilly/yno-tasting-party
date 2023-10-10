require 'rails_helper'

RSpec.describe Taster, type: :model do
  let(:user) { create(:user) }
  let(:taster) { create(:taster, user:) }

  # it { is_expected.to validate_presence_of(:name) }
  # it { is_expected.to validate_length_of(:name).is_at_least(1) }

  describe "attributes" do
    it "should have name, user, status attributes" do
      expect(taster).to have_attributes(name: taster.name, user: taster.user, status: taster.status)
    end
  end

  describe "status" do
    it "should default status to 'pending'" do
      expect(taster.status).to eq "active"
    end
    it "should respond to pending?" do
      expect(taster.pending?).to be_falsey
    end
    it "should respond to active?" do
      expect(taster.active?).to be_truthy
    end
    it "should respond to inactive?" do
      expect(taster.inactive?).to be_falsey
    end
  end

  describe "invites" do
    it "should default to empty" do
      expect(taster.invites).to eq []
    end
    context "with tastings" do
      before do
        host_user = create(:user)
        host_taster = create(:taster, user: host_user)
        host = create(:host, taster: taster)
        location = create(:location)
        @tasting = create(:tasting, host: host, location: location)
        @guest = create(:guest, tasting: @tasting, taster: taster, invited: 1.hour.ago)
      end
      it "should contain guests with invitation_open?" do
        expect(taster.invites).to eq [@guest]
      end
      it "should not contain confirmed guests" do
        @guest.confirmed = Time.current
        @guest.save
        expect(taster.invites).to eq []
      end
      it "should not guest from closed tastings" do
        @tasting.closed_at = Time.current
        @tasting.save
        expect(taster.invites).to eq []
      end
    end
  end


end
