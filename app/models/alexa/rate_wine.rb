class Alexa::RateWine < Alexa::RecordBase


  def respond(params)

    wine_slot = params["intent"]["slots"]["Wine"]
    rating_slot = params["intent"]["slots"]["Rating"]
    taster_slot = params["intent"]["slots"]["Taster"]

    if params["intent"]["confirmationStatus"] == "COMPLETED"
      guest = Guest.where(tasting: @tasting, taster_number: taster_slot["value"]).first
      wine_review = WineReview.where(tasting: @tasting, taster: guest.taster).first
      return plaintext_response("Done. You have #{guest.reviews_left.count} reviews remaining.")
    end

    if params["dialogState"] === "COMPLETED"
      return render json: {"type":"Dialog.Delegate"}
    end

    if wine_slot
      if rating_slot
        if taster_slot
          guest = Guest.where(tasting: @tasting, taster_number: taster_slot["value"]).first
          wine_review = WineReview.where(tasting: @tasting, taster: guest.taster).first
          if wine_review.update(rating: rating_slot["value"])
            return plaintext_response("Got it. I rated wine #{wine_slot["value"]} a rating of #{rating_slot["value"]} for taster #{guest.taster.handle}")
          else
            return plaintext_response("Sorry, I didn't understand something you said. Let's try again.")
          end
        else
          plaintext_response("Great, and what is your taster number? It should be listed next to your name.")
        end
      else
        plaintext_response("Nice, and now your rating. Where one is worst, and five is best, what is your rating for this wine?")
      end
    end

    plaintext_response("OK, for what wine number?")

  end

  # def dialog(params)
  #
  #
  # end


end
