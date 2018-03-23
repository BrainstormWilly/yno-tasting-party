require 'rails_helper'

RSpec.describe Alexa::AddWineCommentIntent, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:location){ create(:location)}
  let(:tasting){ create(:tasting, host: host, location: location) }
  let!(:guest1){ create(:guest, tasting: tasting, taster: taster) }
  let!(:tasting_wine1){ create(:tasting_wine, tasting: tasting) }
  let!(:tasting_wine2){ create(:tasting_wine, tasting: tasting) }
  let(:alexa_params_no_slots){
    {
      "request" => {
        "intent" => {
          "name" => "RateWineIntent"
        }
      }
    }
  }
  let(:alexa_params_wine_slot){
    {
      "request" => {
        "dialogState" => "IN_PROGRESS",
        "intent" => {
          "name" => "RateWineIntent",
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
  let(:alexa_params_wine_and_rating_slot){
    {
      "request" => {
        "dialogState" => "IN_PROGRESS",
        "intent" => {
          "name" => "RateWineIntent",
          "slots" => {
            "wine" => {
              "name" => "wine",
              "value" => "1"
            },
            "rating" => {
              "name" => "rating",
              "value" => "3"
            }
          }
        }
      }
    }
  }
  let(:alexa_params_all_slots){
      {
        "request" => {
          "dialogState" => "COMPLETED",
          "intent" => {
            "name" => "RateWineIntent",
            "slots" => {
              "wine" => {
                "name" => "wine",
                "value" => "1"
              },
              "rating" => {
                "name" => "rating",
                "value" => "3"
              },
              "taster" => {
                "name" => "taster",
                "value" => guest1.taster_number
              }
            }
          }
        }
      }
    }

  def has_all_slots?(svc)
    svc.taster && svc.wine && svc.rating
  end



  describe "with no slots" do
    before do
      @svc = Alexa::RateWineIntent.new(tasting, alexa_params_no_slots)
    end
    it "has_all_slots? should be falsey" do
      expect(has_all_slots?(@svc)).to be_falsey
    end
    it "sets response.type to Dialog.Delegate" do
      expect(@svc.response["response"]["directives"][0]["type"]).to eq "Dialog.Delegate"
    end
    it "sets wine to falsey" do
      expect(@svc.wine).to be_falsey
    end
    it "sets rating to falsey" do
      expect(@svc.rating).to be_falsey
    end
  end

  describe "with wine slot" do
    before do
      @svc = Alexa::RateWineIntent.new(tasting, alexa_params_wine_slot)
    end
    it "has_all_slots? should be falsey" do
      expect(has_all_slots?(@svc)).to be_falsey
    end
    it "sets response.type to Dialog.Delegate" do
      expect(@svc.response["response"]["directives"][0]["type"]).to eq "Dialog.Delegate"
    end
    it "sets wine to 1" do
      expect(@svc.wine).to eq 1
    end
    it "sets rating to falsey" do
      expect(@svc.rating).to be_falsey
    end
    it "sets taster_name to false" do
      expect(@svc.taster_name).to eq "unknown"
    end
  end

  describe "with wine and rating slot" do
    before do
      @svc = Alexa::RateWineIntent.new(tasting, alexa_params_wine_and_rating_slot)
    end
    it "has_all_slots? should be falsey" do
      expect(has_all_slots?(@svc)).to be_falsey
    end
    it "sets response.type to Dialog.Delegate" do
      expect(@svc.response["response"]["directives"][0]["type"]).to eq "Dialog.Delegate"
    end
    it "sets wine to 1" do
      expect(@svc.wine).to eq 1
    end
    it "sets rating to 3" do
      expect(@svc.rating).to eq 3
    end
    it "sets taster_name to false" do
      expect(@svc.taster_name).to eq "unknown"
    end
  end

  describe "with all slots" do
    before do
      @svc = Alexa::RateWineIntent.new(tasting, alexa_params_all_slots)
    end
    it "has_all_slots? should be true" do
      expect(has_all_slots?(@svc)).to be_truthy
    end
    it "sets response.type to Dialog.ConfirmIntent" do
      expect(@svc.response["response"]["directives"][0]["type"]).to eq "Dialog.ConfirmIntent"
    end
    it "sets wine to 1" do
      expect(@svc.wine).to eq 1
    end
    it "sets rating to 3" do
      expect(@svc.rating).to eq 3
    end
    it "sets taster_name to taster.handle" do
      expect(@svc.taster_name).to eq taster.handle
    end
  end

end
