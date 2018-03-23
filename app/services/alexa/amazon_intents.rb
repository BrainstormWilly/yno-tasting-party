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
    "<s><say-as interpret-as='interjection'>okey dokey</say-as></s>"
  end

  def help_speak
    "<s>It's easy<s/> <s>Say<break time='.3s'/> Rate a wine. Or<break time='.3s'/> Add a comment. Or<break time='.3s'/> Get tasting stats. Or<break time='.3s'/> Get average wine rating</s> <prosody pitch='high'>Try it</prosody>"
  end

end
