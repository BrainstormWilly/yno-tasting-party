require 'rails_helper'

RSpec.describe Guest, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:tasting){ create(:tasting, host: host, location: location) }
  let!(:guest){ create(:guest, tasting: tasting, taster: taster, invited: 1.hour.ago) }
  let!(:tasting_wine){ create(:tasting_wine, tasting: tasting) }
  let!(:tasting_wine2){ create(:tasting_wine, tasting: tasting) }
  let!(:wine_review){ create(:wine_review, tasting: tasting, taster: taster, wine_number:1) }
  let!(:wine_review2){ create(:wine_review, tasting: tasting, taster: taster, wine_number:2) }

  it { is_expected.to validate_presence_of(:taster_id) }
  it { is_expected.to validate_presence_of(:tasting_id) }

  describe "attributes" do
    it "should have taster, tasting, taster_number attributes" do
      expect(guest).to have_attributes(taster: guest.taster, tasting: guest.tasting, taster_number: guest.taster_number)
    end
    it "should default first taster number to 1" do
      expect(guest.taster_number).to eq 1
    end
  end

  describe "tasting_confirmed" do
    it "should respond to #tasting_confirmed?" do
      expect(guest).to respond_to :tasting_confirmed?
    end
    it "should init as falsey" do
      expect(guest.tasting_confirmed?).to be_falsey
    end
    it "should change to truthy when #confirmed is set" do
      guest.confirmed = Time.current
      guest.save
      expect(guest.tasting_confirmed?).to be_truthy
    end
  end

  describe "invitation_open" do
    it "should respond to #invitation_open?" do
      expect(guest).to respond_to :invitation_open?
    end
    it "should init as truthy" do
      expect(guest.invitation_open?).to be_truthy
    end
    it "should change to falsey when #confirmed is set while tasting open" do
      guest.confirmed = Time.current
      guest.save
      expect(guest.invitation_open?).to be_falsey
    end
  end

  describe "reviews_left" do
    it "should respond to reviews_left" do
      expect(guest).to respond_to :reviews_left
    end
    it "default to all initial reviews" do
      expect(guest.reviews_left.count).to eq 2
    end
    it "returns unrated reviews only" do
      wine_review.updated_at = 1.minute.from_now
      wine_review.save
      expect(guest.reviews_left).to eq [wine_review2]
    end
  end

  describe "sequence_taster_number" do
    before do
      user2 = create(:user)
      taster2 = create(:taster, user: user2)
      @guest2 = Guest.new(tasting: tasting, taster: taster2)
      @guest2.save
    end
    it "should assign next available taster number" do
      expect(@guest2.taster_number).to eq 2
    end
  end

end
