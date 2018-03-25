class Alexa::AddWineCommentIntent

  def initialize(tasting, params)
    @tasting = tasting
    @params = params
    # @wine_review = nil
    # if taster
    #   @guest = Guest.where(tasting: @tasting, taster_number: taster).first
    # end
  end

  def guest
    Guest.where(tasting: @tasting, taster_number: taster).first
  end

  def taster_name
    guest.taster.handle || guest.taster.name rescue "unknown"
  end

  def confirmationStatus
    @params["request"]["intent"]["confirmationStatus"] rescue "NONE"
  end

  def dialogState
    @params["request"]["dialogState"] rescue "STARTED"
  end

  def wine
    @params["request"]["intent"]["slots"]["wine"]["value"].to_i rescue nil
  end

  def taster
    @params["request"]["intent"]["slots"]["taster"]["value"].to_i rescue nil
  end

  def comment
    @params["request"]["intent"]["slots"]["comment"]["value"] rescue nil
  end


  # def has_all_slots?
  #   wine && taster && comment
  # end

  def process_request
    wr = WineReview.where(wine_number: wine, tasting: @tasting, taster_id: guest.taster_id).first
    return false if !wr
    return false if !comment
    comments = wr.comments.split(",").map{ |e| e.strip } rescue []
    comments = comments << comment unless comments.include?(comment)
    wr.update(comments: comments.join(", "))
  end

  def response
    if confirmationStatus == "CONFIRMED"
      return completed_body if process_request
      return failed_body
    elsif confirmationStatus == "DENIED"
      return denied_body
    end
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
              <s>#{taster_name}.</s>
              <s>You want to add comment <break time='.3s'/><prosody pitch='low'>#{comment}</prosody><break time='.3s'/> for wine number<break time='.1s'/> #{wine}.</s>
              <s>Is that correct?</s>
            </speak>"
        },
        "shouldEndSession": false,
        "directives": [
          {
            "type": "Dialog.ConfirmIntent"
          }
        ]
      }
    }
  end

  def completed_body
    {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "
            <speak>
              <s>Done.</s>
              <s>Your comment has been succesfully added.</s>
            </speak>"
        },
        "shouldEndSession": true
      }
    }
  end

  def failed_body
    {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "
            <speak>
              <s><say-as interpret-as='interjection'>d'oh</say-as></s>
              <s>I wasn't able to save your request. Please try again.</s>
            </speak>
          "
        },
        "shouldEndSession": true
      }
    }
  end

  def denied_body
    {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "
            <speak>
              <s><say-as interpret-as='interjection'>uh oh</say-as></s>
              <s>Try again and I'll see if I can get it right.</s>
            </speak>
          "
        },
        "shouldEndSession": true
      }
    }
  end

end
