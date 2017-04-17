require 'rails_helper'

RSpec.describe Wine, type: :model do

  let!(:user){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:wine){ create(:wine) }
  let!(:location){ create(:location) }
  let!(:tasting){ create(:tasting, host:host, location: location) }
  let!(:tasting_wine){ create(:tasting_wine, tasting: tasting, wine: wine) }
  let!(:wine_review){ create(:wine_review, wine: wine, tasting: tasting, taster: taster, wine_number: 1, rating: 3) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_least(6) }
  it { is_expected.to validate_presence_of(:price) }

  describe "attributes" do
    it "should have name, vintage, price attributes" do
      expect(wine).to have_attributes(name: wine.name, vintage: wine.vintage, price: wine.price)
    end
  end

  describe "associations" do
    it "should have tasting_wines" do
      expect(wine.tasting_wines).to eq [tasting_wine]
    end
    it "should have wine_reviews" do
      expect(wine.wine_reviews).to eq [wine_review]
    end
  end


end
