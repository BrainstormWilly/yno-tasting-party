class Alexa::Launch < Alexa::RecordBase

  def respond(params)
    plaintext_response("Welcome to Yno Wine Tasting. While tasting you can ask me to rate a wine, get an average rating for a wine, or get tasting statistics. Which would you like to do?")
  end

end
