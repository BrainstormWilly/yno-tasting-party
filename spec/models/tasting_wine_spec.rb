require 'rails_helper'

RSpec.describe TastingWine, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location) }
  let(:tasting){ create(:tasting, host: host, location: location) }
  let(:wine){ create(:wine) }
  let(:tasting_wine){ create(:tasting_wine, wine: wine, tasting: tasting) }

  describe "attributes" do
    it "should have wine, tasting, wine_number attributes" do
      expect(tasting_wine).to have_attributes(wine_id: tasting_wine.wine_id, tasting_id: tasting_wine.tasting_id, wine_number: tasting_wine.wine_number)
    end
    it "should default wine_number to 0" do
      expect(tasting_wine.wine_number).to eq 0
    end
  end

  describe "is_last_reveal?" do
    before do
      wine2 = create(:wine)
      @tasting_wine2 = create(:tasting_wine, wine: wine2, tasting: tasting)
    end
    context "when none revealed" do
      it "should be false" do
        expect(tasting_wine.is_last_reveal?).to be_falsey
      end
    end
    context "when 1 reveal left but replacing other" do
      before do
        @tasting_wine2.wine_number = 1
        @tasting_wine2.save
      end
      it "should be false" do
        expect(@tasting_wine2.is_last_reveal?).to be_falsey
      end
    end
    context "when doing final reveal" do
      before do
        @tasting_wine2.wine_number = 1
        @tasting_wine2.save
      end
      it "should be true" do
        expect(tasting_wine.is_last_reveal?).to be_truthy
      end
    end
  end


end
