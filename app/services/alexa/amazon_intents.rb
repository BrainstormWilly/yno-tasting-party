class Alexa::AmazonIntents

  def initialize(params)
    @params = params
  end

  def request
    @params["request"]["intent"]["name"] rescue "AMAZON.StopIntent"
  end

  def response
    return response_body(help_speak) if request == "AMAZON.HelpIntent"
    response_body(stop_speak, true)
  end


  private

  def response_body(speak, end_session=false)
    {
      "version" => "1.0",
      "response" => {
        "outputSpeech" => {
          "type" => "SSML",
          "ssml" => "<speak>#{speak}</speak>"
        },
        "shouldEndSession" => end_session
      }
    }
  end

  def stop_speak
    "<s>OK</s><s>Come back anytime</s>"
  end

  def help_speak
    "It's easy<break time='1s'/> Say<break time='.5s'/> Rate a wine. Or<break time='.5s'/> Get tasting stats. Or<break time='.5s'/> Get average wine rating<break time='.5s'/> <prosody pitch='high'>Try it</prosody>"
  end

end
