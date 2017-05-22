require 'rails_helper'

RSpec.describe Alexa::GetTastingStatsIntent, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location)}
  let(:tasting){ create(:tasting, host: host, location: location) }
  let(:wine1){ create(:wine) }
  let(:wine2){ create(:wine) }
  let!(:guest1){ create(:guest, tasting: tasting, taster: taster) }
  let!(:tasting_wine1){ create(:tasting_wine, tasting: tasting) }
  let!(:tasting_wine2){ create(:tasting_wine, tasting: tasting) }
  let!(:wine_review1){ create(:wine_review, wine_number: 1, taster: taster, tasting: tasting) }
  let!(:wine_review2){ create(:wine_review, wine_number: 2, taster: taster, tasting: tasting) }

  let(:alexa_params){
    {
      "request" => {
        "intent" => {
          "name" => "GetTastingStatsIntent"
        }
      }
    }
  }

  describe "get tasting status details with no rated wines" do
    before do
      @svc = Alexa::GetTastingStatsIntent.new(tasting, alexa_params)
    end
    it "should be 0% complete" do
      expect(@svc.percent_complete).to eq 0
    end
    it "rated reviews should be 0" do
      expect(@svc.reviews_rated).to eq 0
    end
    it "rated reviews should be 2" do
      expect(@svc.reviews_unrated).to eq 2
    end
  end

  describe "get tasting status details with half rated wines" do
    before do
      wine_review1.updated_at = 1.hour.from_now
      wine_review1.save
      @svc = Alexa::GetTastingStatsIntent.new(tasting, alexa_params)
    end
    it "should be 0% complete" do
      expect(@svc.percent_complete).to eq 50
    end
    it "rated reviews should be 1" do
      expect(@svc.reviews_rated).to eq 1
    end
    it "rated reviews should be 1" do
      expect(@svc.reviews_unrated).to eq 1
    end
  end

  describe "get tasting status details with all rated wines" do
    before do
      wine_review1.rating = 4
      wine_review1.updated_at = 1.hour.from_now
      wine_review1.save
      wine_review2.rating = 3
      wine_review2.updated_at = 1.hour.from_now
      wine_review2.save
      @svc = Alexa::GetTastingStatsIntent.new(tasting, alexa_params)
    end
    it "should be 0% complete" do
      expect(@svc.percent_complete).to eq 100
    end
    it "rated reviews should be 2" do
      expect(@svc.reviews_rated).to eq 2
    end
    it "rated reviews should be 0" do
      expect(@svc.reviews_unrated).to eq 0
    end
  end

end
