class Api::Alexa::V1::RequestsController < ApplicationController

  def default
    verification_success = settings.cert_verifier.verify!(
      request.env["HTTP_SIGNATURECERTCHAINURL"],
      request.env['HTTP_SIGNATURE'],
      request.body.read
    )
    return make_plaintext_response("Congratulations, My verification successful") if verification_success
    make_plaintext_response("Uh oh, My verification is not successful")
  end


  private

  def make_plaintext_response(text)
    {
      "version" => "1.0",
      "sessionAttributes" => { },
      "response" => {
        "outputSpeech" => {
          "type" => "PlainText",
          "ssml" => text
        },
        "shouldEndSession" => true
      }
    }.to_json
  end

end
