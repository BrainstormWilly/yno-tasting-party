class Api::Alexa::V1::RequestsController < ActionController::Base

  prepend_before_action :set_access_token_in_params
  before_action :doorkeeper_authorize!

  def default
    # Alexa Verification
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

    request = params["request"]["type"]

    # Verification invalid
    return make_plaintext_response("Alexa? Is that you? I am unable to verify.") unless verification_success

    host = current_doorkeeper_host

    # User is not a host
    return make_plaintext_response("I'm sorry. In order to use me with Yno Wine Tastings, you must be a registered host with an open tasting. Go to ynotasting dot com slash alexa to learn more.") unless host

    open_tasting = Tasting.get_open_for_host(host)

    # No open tastings
    return make_plaintext_response("Hello #{host.taster.handle}, I don't see any open tastings for you. I can only help you with open tastings. Go to ynotasting dot com slash alexa to learn more.") unless open_tasting

    # Launch request
    return play_preamble if request == "LaunchRequest"

    # Intent request
    if request == "IntentRequest"
      intent = params["request"]["intent"]["name"]
      if intent == "RateWineIntent"
        svc = Alexa::RateWineIntent.new(open_tasting, params)
      elsif intent == "GetTastingStatsIntent"
        svc = Alexa::GetTastingStatsIntent.new(open_tasting, params)
      elsif intent == "GetAverageWineRatingIntent"
        svc = Alexa::GetAverageWineRatingIntent.new(open_tasting, params)
      else
        svc = Alexa::AmazonIntents.new(params)
      end

      render json: svc.response
    end
  end

  def current_doorkeeper_host
    Host.find_by(taster: current_doorkeeper_taster)
  end

  def current_doorkeeper_taster
    Taster.find_by(user: current_doorkeeper_user )
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

  def make_plaintext_response(text, end_session=false)
    render json: {
      "version": "1.0",
      "sessionAttributes": { },
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": text
        },
        "shouldEndSession": end_session
      }
    }
  end

  def play_preamble
    render json: {
      "version" => "1.0",
      "response" => {
        "outputSpeech" => {
          "type" => "SSML",
          "ssml" => "
            <speak>
              <s>Welcome to<break time='.1s'/> why no Wine Tasting</s>
              <s>Your tasting<break time='.1s'/> <prosody pitch='low'>#{open_tasting.name}</prosody><break time='.1s'/> is currently open</s>
              <s>While tasting you can ask me to do the following<break time='.5s'/> rate a wine<break time='.5s'/> get an average rating for a wine<break time='.5s'/> or<break time='.5s'/> get tasting statistics</s>
              <s>Which would you like to do?</s>
            </speak>"
        },
        "shouldEndSession" => false
      }
    }
  end

end
