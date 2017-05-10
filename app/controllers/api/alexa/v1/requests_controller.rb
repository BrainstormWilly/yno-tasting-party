class Api::Alexa::V1::RequestsController < ActionController::Base

  def default
    verifier = AlexaVerifier.build do |c|
      c.verify_signatures = true
      c.verify_timestamps = true
      c.timestamp_tolerance = 60 # seconds
    end
    verification_success = verifier.verify!(
      request.headers['SignatureCertChainUrl'],
      request.headers['Signature'],
      request.body.read
    )

    return make_plaintext_response("Congratulations, My verification successful") if verification_success
    make_plaintext_response("Uh oh, My verification was not successful")
  end


  private

  def make_plaintext_response(text)
    render json: {
      "version": "1.0",
      "sessionAttributes": { },
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": text
        },
        "shouldEndSession": true
      }
    }
  end

end
