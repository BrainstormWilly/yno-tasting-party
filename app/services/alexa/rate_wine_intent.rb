class Alexa::RateWineIntent

  def initialize(tasting, params)
    @tasting = tasting
    @params = params
    if taster
      @guest = Guest.where(tasting: @tasting, taster_number: taster).first
    end
    if wine
      @wine_review = WineReview.find_by(wine_number: wine, tasting: @tasting)
    end
  end

  def dialogState
    return @params["request"]["dialogState"] rescue "STARTED"
  end

  def wine
    @params["request"]["intent"]["slots"]["wine"]["value"].to_i rescue nil
  end

  def rating
    @params["request"]["intent"]["slots"]["rating"]["value"].to_i rescue nil
  end

  def taster
    @params["request"]["intent"]["slots"]["taster"]["value"].to_i rescue nil
  end

  def taster_name
    @guest.taster.handle rescue nil
  end

  def reviews_left
    @guest.reviews_left rescue 0
  end
  def reviews_left_to_str
    return "All your reviews are in." if reviews_left == 0
    "You have #{reviews_left} wine #{"review".pluralize(reviews_left)} remaining"
  end

  def has_all_slots?
    wine && rating && taster
  end

  def has_a_slot?
    wine || rating || taster
  end

  def process_request
    wr = WineReview.find_by(wine_number: wine, tasting: @tasting)
    g = Guest.where(tasting: @tasting, taster_number: taster).first
    return false if !wr || !g
    wr.update(rating: rating, taster: g.taster)
  end

  def response
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
              Let's see. <break time='1s'/> I have a rating of #{rating}. <break time='1s'/> On wine #{wine}. <break time='1s'/> For taster #{taster_name}. <break time='1s'/> Is that correct?
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




end
