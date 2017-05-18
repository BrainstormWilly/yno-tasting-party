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

  def has_all_slots?
    wine && rating && taster
  end

  def process_request
    wr = WineReview.find_by(wine_number: wine, tasting: @tasting)
    g = Guest.where(tasting: @tasting, taster_number: taster).first
    return false if !wr || !g
    wr.update(rating: rating, taster: g.taster)
  end

  def response
    return {"type": "Dialog.Delegate"} if !has_all_slots?
    {
      "type": "Dialog.ConfirmIntent",
      "updatedIntent":{
        "name": "RateWineIntent",
        "confirmationStatus": "COMPLETED",
        "slots":{
          "wine":{
            "name": "wine",
            "value": wine
          },
          "rating":{
            "name": "rating",
            "value": rating
          },
          "taster":{
            "name": "taster",
            "value": taster
          }
        }
      }
    }
  end



end
