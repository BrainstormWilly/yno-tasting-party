class Alexa::GetAverageWineRatingIntent

  def initialize(tasting, params)
    @tasting = tasting
    @params = params
  end

  def dialogState
    return @params["request"]["dialogState"] rescue "STARTED"
  end

  def wine
    @params["request"]["intent"]["slots"]["wine"]["value"].to_i rescue nil
  end

  def response
    return confirm_body if dialogState == "COMPLETED"
    delegate_body
  end


  private

  def delegate_body
    {
      "version": "1.0",
      "response": {
        "directives": [
          {
            "type": "Dialog.Delegate"
          }
        ],
        "shouldEndSession": false
      }
    }
  end

  def confirm_body
    {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "
            <speak>
              Currently. The average rating for wine number #{wine} is #{@tasting.average_rating_for_wine(wine)} with #{@tasting.selected_wine(wine)["recorded_reviews"]} #{"review".pluralize(@tasting.selected_wine(wine)["recorded_reviews"])} completed.
            </speak>"
        },
        "shouldEndSession": true
      }
    }
  end

end
