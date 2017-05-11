class Api::Alexa::V1::RequestsController < ActionController::Base

  prepend_before_action :set_access_token_in_params
  before action :doorkeeper_authorize!


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

  def current_doorkeeper_user
    @current_doorkeeper_user ||= User.find(doorkeeper_token.resource_owner_id)
  end


  private

  def set_access_token_in_params
    request.parameters[:access_token] = token_from_params
  end

  def token_from_params
    params["session"]["user"]["accessToken"] rescue nil
  end

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
