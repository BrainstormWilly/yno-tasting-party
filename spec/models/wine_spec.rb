require 'rails_helper'

RSpec.describe Wine, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user:) }
  let(:host){ create(:host, taster:) }
  let(:wine){ create(:wine) }
  let(:location){ create(:location) }
  let!(:tasting){ create(:tasting, host:, location:) }
  let!(:tasting_wine){ create(:tasting_wine, tasting:, wine:) }
  let!(:wine_review){ create(:wine_review, wine:, tasting:, taster:, wine_number: 1, rating: 3) }

  it { should validate_presence_of(:name) }

  describe "attributes" do
    it "should have name, vintage attributes" do
      expect(wine).to have_attributes(name: wine.name, vintage: wine.vintage)
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
