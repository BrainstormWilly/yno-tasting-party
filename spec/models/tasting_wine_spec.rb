require 'rails_helper'

RSpec.describe TastingWine, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }
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

end
