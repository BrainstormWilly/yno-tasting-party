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
    return @params["request"]["dialogState"]
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
    if dialogState == "STARTED"
      res = {
        "type" => "Dialog.Delegate",
        "updatedIntent" => {
          "name" => "RateWineIntent",
          "confirmationStatus" => "NONE"
        }
      }
      if has_a_slot?
        res["updatedIntent"]["slots"] = {}
      end
      res["updatedIntent"]["slots"]["wine"] = {
        "name" => "wine",
        "value" => wine
      } if wine
      res["updatedIntent"]["slots"]["rating"] = {
        "name" => "rating",
        "value" => rating
      } if rating
      res["updatedIntent"]["slots"]["taster"] = {
        "name" => "taster",
        "value" => taster
      } if taster
      return res
    elsif dialogState == "IN_PROGRESS"
      return {"type": "Dialog.Delegate"}
    end
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
