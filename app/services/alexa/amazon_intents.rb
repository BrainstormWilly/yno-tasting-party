class Alexa::AmazonIntents

  def initialize(params)
    # p "@@@@@@@@ #{self.class.name}: #{params}"
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
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak>#{speak}</speak>"
        },
        "shouldEndSession": end_session
      }
    }
  end

  def stop_speak
    "<s>OK, come back any time</s>"
  end

  def help_speak
    "<s>It's easy</s>
    <s>Say</s>
    <s>Rate a wine.</s><break time='.2s'/>
    <s>Add a comment.</s><break time='.2s'/>
    <s>Get tasting stats.</s><break time='.2s'/>
    <s>Or, Get average wine rating</s><break time='.2s'/>
    <s><prosody pitch='high'>Give it</prosody> a try!</s>"
  end

end
