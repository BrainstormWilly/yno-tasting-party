require 'rails_helper'

RSpec.describe WineReview, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:wine){ create(:wine) }
  let(:location){ create(:location) }
  let(:tasting){ create(:tasting, host:host, location: location) }
  let!(:tasting_wine){ create(:tasting_wine, tasting: tasting, wine: wine) }
  let!(:wine_review){ create(:wine_review, tasting: tasting, taster: taster, wine_number: 1, rating: 3) }

  it { is_expected.to validate_presence_of(:taster_id) }
  it { is_expected.to validate_presence_of(:wine_number) }
  it { is_expected.to validate_presence_of(:tasting_id) }
  it { is_expected.to validate_presence_of(:rating) }

  describe "attributes" do
    it "should have taster, tasting, wine_number, rating attributes" do
      expect(wine_review).to have_attributes(taster: wine_review.taster, tasting: wine_review.tasting, wine_number: wine_review.wine_number, rating: wine_review.rating)
    end
    # it "should default rating to 3" do
    #   expect(wine_review.rating).to eq 3
    # end
    it "should allow rating values 1..5" do
      (1..5).to_a.each do |v|
        should allow_value(v).for(:rating)
      end
    end
    it "should not allow rating values < 0" do
      (-1..-5).to_a.each do |v|
        should_not allow_value(v).for(:rating)
      end
    end
    it "should not allow rating values > 5" do
      (6..10).to_a.each do |v|
        should_not allow_value(v).for(:rating)
      end
    end
    it "should not allow wine_number values <= 0" do
      (0..-5).to_a.each do |v|
        should_not allow_value(v).for(:wine_number)
      end
    end
  end

  describe "unrated?" do
    context "has not been rated" do
      it "should be initially true" do
        expect(wine_review.unrated?).to be_truthy
      end
    end
    context "has been rated" do
      before do
        wine_review.updated_at = 1.minute.from_now
        wine_review.save
      end
      it "should change to false when rated" do
        expect(wine_review.unrated?).to be_falsey
      end
    end
  end

  describe "self.tasting_has_reviews?" do
    context "wines are unrated" do
      it "should be false" do
        expect(WineReview.tasting_has_reviews?(tasting)).to be_falsey
      end
    end
    context "wines are rated" do
      before do
        wine_review.updated_at = 1.minute.from_now
        wine_review.save
      end
      it "should be true" do
        expect(WineReview.tasting_has_reviews?(tasting)).to be_truthy
      end
    end
  end

  describe "self.next_wine_number_for_tasting" do
    context "no reviews" do
      before do
        user2 = create(:user)
        taster2 = create(:taster, user: user2)
        host2 = create(:host, taster: taster2)
        location2 = create(:location)
        @tasting2 = create(:tasting, host: host2, location: location2)
      end
      it "should be start at 1" do
        expect(WineReview.next_wine_number_for_tasting(@tasting2)).to eq 1
      end
    end
    context "has reviews" do
      it "should equal 1 more than exists" do
        expect(WineReview.next_wine_number_for_tasting(tasting)).to eq 2
      end
    end
  end

  describe "self.create_next_in_sequence_for_guest" do
    context "no reviews" do
      before do
        user2 = create(:user)
        @taster2 = create(:taster, user: user2)
        host2 = create(:host, taster: @taster2)
        location2 = create(:location)
        @tasting2 = create(:tasting, host: host2, location: location2)
      end
      it "should be start at 1" do
        WineReview.create_next_in_sequence_for_guest(@tasting2, @taster2)
        reviews = WineReview.where(tasting: @tasting2, taster: @taster2)
        expect(reviews.count).to eq 1
        expect(reviews.first.wine_number).to eq 1
      end
    end
    context "add one should change wine number" do
      it "should equal 2" do
        WineReview.create_next_in_sequence_for_guest(tasting, taster)
        reviews = WineReview.where(tasting: tasting, taster: taster)
        expect(reviews.count).to eq 2
        expect(reviews.last.wine_number).to eq 2
      end
    end
  end

  describe "self.delete_all_last_for_tasting" do
    before do
      wine2 = create(:wine)
      user2 = create(:user)
      taster2 = create(:taster, user: user2)
      taster2_wine_review1 = create(:wine_review, tasting: tasting, taster: taster2, wine_number: 1)
      taster2_wine_review2 = create(:wine_review, tasting: tasting, taster: taster2, wine_number: 2)
      tasting_wine2 = create(:tasting_wine, tasting: tasting, wine: wine2)
      @wine_review2 = create(:wine_review, tasting: tasting, taster: taster, wine_number: 2, rating: 3)
    end
    it "should eliminate last review for all tasters" do
      WineReview.delete_all_last_for_tasting(tasting)
      reviews = WineReview.where(tasting: tasting)
      expect(reviews.count).to eq 2
      expect(WineReview.next_wine_number_for_tasting(tasting)).to eq 2
    end
  end

  describe "self.create_all_for_guest" do
    before do
      user2 = create(:user)
      @taster2 = create(:taster, user: user2)
      wine2 = create(:wine)
      tasting_wine2 = create(:tasting_wine, tasting: tasting, wine: wine2)
    end
    it "should create 1 taster review for each tasting wine" do
      WineReview.create_all_for_guest(tasting, @taster2)
      reviews = WineReview.where(tasting: tasting, taster: @taster2)
      expect(reviews.count).to eq 2
    end
  end

  describe "self.delete_all_for_guest" do
    before do
      wine2 = create(:wine)
      tasting_wine2 = create(:tasting_wine, tasting: tasting, wine: wine2)
      wine_review2 = create(:wine_review, tasting: tasting, taster: taster, wine_number: 2, rating: 3)
    end
    it "should delete all taster reviews" do
      WineReview.delete_all_for_guest(tasting, taster)
      reviews = WineReview.where(tasting: tasting, taster: taster)
      expect(reviews.count).to eq 0
    end
  end

end
