class Alexa::GetTasterWineRatingsIntent

  def initialize(tasting, params)
    @tasting = tasting
    @params = params
  end

  def dialogState
    return @params["request"]["dialogState"] rescue "STARTED"
  end

  def guest
    Guest.where(tasting: @tasting, taster_number: taster).first
  end

  def taster
    @params["request"]["intent"]["slots"]["taster"]["value"].to_i rescue nil
  end

  def response
    return confirm_body if dialogState == "COMPLETED"
    delegate_body
  end

  def wine_reviews_to_str
    return "<s>I have nothing</s>" if !taster
    reviews = WineReview.where(tasting: @tasting, taster_id: guest.taster_id)
    left = TastingWine.where(tasting: @tasting).count - reviews.count
    return "<s>You have not rated any wines yet.</s><s><emphasis level='strong'>Get with it!</emphasis></s>" if reviews.empty?
    str = "<s>So far, you've rated</s>"
    reviews.each do |wr|
      str << "<s>a #{wr.rating} for wine number #{wr.wine_number}</s>"
    end
    str << "<s>All your ratings are in.</s><s><say-as interpret-as='interjection'>well done</say-as></s>" if left==0
    str << "<s>You have #{left} wine #{"review".pluralize(left)} remaining</s>" unless left==0
    str
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
              #{wine_reviews_to_str}
            </speak>"
        },
        "shouldEndSession": true
      }
    }
  end

end
