require 'rails_helper'

RSpec.describe Alexa::AmazonIntents, type: :model do

  let(:alexa_params_amazon_help){
    {
      "request" => {
        "intent" => {
          "name" => "AMAZON.HelpIntent"
        }
      }
    }
  }
  let(:alexa_params_amazon_stop){
    {
      "request" => {
        "intent" => {
          "name" => "AMAZON.StopIntent"
        }
      }
    }
  }
  let(:alexa_params_amazon_cancel){
    {
      "request" => {
        "intent" => {
          "name" => "AMAZON.CancelIntent"
        }
      }
    }
  }

  describe "HelpIntent" do
    before do
      @svc = Alexa::AmazonIntents.new(alexa_params_amazon_help)
    end
    it "sets response.outputSpeech" do
      expect(@svc.response["response"]["outputSpeech"]["ssml"].gsub(/\s+/,'')).to eq "
        <speak>
          It's easy<break time='1s'/> Say<break time='.5s'/> Rate a wine. Or<break time='.5s'/> Get tasting stats. Or<break time='.5s'/> Get average wine rating<break time='.5s'/> <prosody pitch='high'>Try it</prosody>
        </speak>".gsub(/\s+/,'')
    end
    it "should not end session" do
      expect(@svc.response["response"]["shouldEndSession"]).to be_falsey
    end
  end

  describe "StopIntent" do
    before do
      @svc = Alexa::AmazonIntents.new(alexa_params_amazon_stop)
    end
    it "sets response.outputSpeech" do
      expect(@svc.response["response"]["outputSpeech"]["ssml"].gsub(/\s+/,'')).to eq "
        <speak>
          <s>OK</s><s>Come back anytime</s>
        </speak>".gsub(/\s+/,'')
    end
    it "should not end session" do
      expect(@svc.response["response"]["shouldEndSession"]).to be_truthy
    end
  end

  describe "CancelIntent" do
    before do
      @svc = Alexa::AmazonIntents.new(alexa_params_amazon_cancel)
    end
    it "sets response.outputSpeech" do
      expect(@svc.response["response"]["outputSpeech"]["ssml"].gsub(/\s+/,'')).to eq "
        <speak>
          <s>OK</s><s>Come back anytime</s>
        </speak>".gsub(/\s+/,'')
    end
    it "should not end session" do
      expect(@svc.response["response"]["shouldEndSession"]).to be_truthy
    end
  end

end
