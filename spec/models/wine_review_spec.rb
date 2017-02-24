require 'rails_helper'

RSpec.describe WineReview, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:wine){ create(:wine) }
  let(:tasting){ create(:tasting, host:host) }

  let(:wine_review){ create(:wine_review, tasting: tasting, taster: taster, wine_number: 1, rating: 3) }

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

end
