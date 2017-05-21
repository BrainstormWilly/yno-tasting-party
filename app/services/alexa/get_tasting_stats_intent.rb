class Alexa::GetTastingStatsIntent

  def initialize(tasting, params)
    @tasting = tasting
    @params = params
  end

  def reviews_unrated
    unrated = 0
    @tasting.wine_reviews.each do |wr|
      unrated += 1 if wr.unrated?
    end
    unrated
  end

  def top_wine

  end

  def reviews_rated
    @tasting.wine_reviews.count - reviews_unrated
  end

  def percent_complete
    (100 * reviews_unrated/@tasting.wine_reviews.count).to_i
  end

  def response
    {
      "version" => "1.0",
      "response" => {
        "outputSpeech" => {
          "type" => "SSML",
          "ssml" => "
            <speak>
              With #{reviews_rated} wine #{"review".pluralize(reviews_rated)} in. This tasting is #{percent_complete} percent complete.<break time='1s'/>
              The top wine is currently wine number #{@tasting.top_rated_wine["wine_number"]}. With an average rating of #{@tasting.top_rating}
            </speak>"
        },
        "shouldEndSession" => true
    }
  end

end
