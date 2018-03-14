class Alexa::AddWineCommentIntent

  def initialize(tasting, params)
    @tasting = tasting
    @params = params
    @wine_review = nil
    if taster
      @guest = Guest.where(tasting: @tasting, taster_number: taster).first
    end
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

  def response
    return confirm_body if dialogState == "COMPLETED"
    delegate_body
  end

  def has_all_slots?
    wine && taster && comment
  end

  def process_request
    wr = WineReview.where(wine_number: wine, tasting: @tasting, taster_number: taster).first
    return false if !wr
    comments = wr.comments.split(",") << comment
    wr.update(comment: comments.join(","))
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
      "version" => "1.0",
      "response" => {
        "directives" => [
          {
            "type" => "Dialog.Delegate"
          }
        ],
        "shouldEndSession" => false
      }
    }
  end

  def confirm_body
    {
      "version" => "1.0",
      "response" => {
        "outputSpeech" => {
          "type" => "SSML",
          "ssml" => "
            <speak>
              OK. <break time='.5s'/> You want to add comment #{comment}. For wine number #{wine}. <break time='.5s'/> Is that correct?
            </speak>"
        },
        "shouldEndSession" => false,
        "directives" => [
          {
            "type" => "Dialog.ConfirmIntent"
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
          "type": "PlainText",
          "text": "Done. <break time='.5s'/> I've added comment #{comment}. For wine number #{wine}."
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
          "type": "PlainText",
          "text": "I'm sorry, I wasn't able to save your request. Please try again."
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
          "type": "PlainText",
          "text": "OK. Try and start again and I'll see if I can get it right."
        },
        "shouldEndSession": true
      }
    }
  end

end
