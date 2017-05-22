require 'rails_helper'

RSpec.describe Alexa::GetAverageWineRatingIntent, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location)}
  let(:tasting){ create(:tasting, host: host, location: location) }
  let!(:guest1){ create(:guest, tasting: tasting, taster: taster) }
  let!(:tasting_wine1){ create(:tasting_wine, tasting: tasting) }
  let!(:tasting_wine2){ create(:tasting_wine, tasting: tasting) }
  let!(:wine_review){ create(:wine_review, tasting: tasting, taster: taster, wine_number: 1, rating: 4, updated_at: 1.hour.from_now) }
  let(:alexa_params_no_slots){
    {
      "request" => {
        "intent" => {
          "name" => "GetAverageWineRatingIntent"
        }
      }
    }
  }
  let(:alexa_params_wine_slot){
    {
      "request" => {
        "dialogState" => "COMPLETED",
        "intent" => {
          "name" => "GetAverageWineRatingIntent",
          "slots" => {
            "wine" => {
              "name" => "wine",
              "value" => "1"
            }
          }
        }
      }
    }
  }

  describe "with no slots" do
    before do
      @svc = Alexa::GetAverageWineRatingIntent.new(tasting, alexa_params_no_slots)
    end
    it "has_all_slots? should be falsey" do
      expect(@svc.wine).to be_falsey
    end
    it "sets response.type to Dialog.Delegate" do
      expect(@svc.response["response"]["directives"][0]["type"]).to eq "Dialog.Delegate"
    end
    it "should not end session" do
      expect(@svc.response["response"]["shouldEndSession"]).to be_falsey
    end
  end

  describe "with wine slot" do
    before do
      @svc = Alexa::GetAverageWineRatingIntent.new(tasting, alexa_params_wine_slot)
    end
    it "sets wine to 1" do
      expect(@svc.wine).to eq 1
    end
    it "sets response.outputSpeech" do
      expect(@svc.response["response"]["outputSpeech"]["ssml"].gsub(/\s+/,'')).to eq "
        <speak>
          Currently. The average rating for wine number 1 is 4.00 with 1 review completed.
        </speak>".gsub(/\s+/,'')
    end
    it "should end session" do
      expect(@svc.response["response"]["shouldEndSession"]).to be_truthy
    end
  end

end
