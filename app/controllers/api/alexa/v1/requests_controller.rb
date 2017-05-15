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

    # Verification invalid
    return make_plaintext_response("Alexa? Is that you? I am unable to verify.") unless verification_success
    return make_plaintext_response("Authorized for token: #{request.parameters[:access_token]}" );

    # host = current_doorkeeper_host
    #
    # # User is not a host
    # return make_plaintext_response("I'm sorry. In order to use me with Yno Wine Tastings, you must be a registered host with an open tasting. Go to ynotasting dot com slash alexa to learn more.") unless host
    #
    # open_tasting = Tasting.get_open_for_host(host)
    #
    # # No open tastings
    # return make_plaintext_response("Hello #{host.taster.handle}, I don't see any open tastings for you. I can only help you with open tastings. Go to ynotasting dot com slash alexa to learn more.") unless open_tasting
    #
    # # Launch request
    # return make_plaintext_response("Welcome to Yno Wine Tasting. While tasting you can ask me to rate a wine, get an average rating for a wine, or get tasting statistics. Which would you like to do?") if params["request"]["type"] == "LaunchRequest"



    # Intent request
    # if params["request"]["type"] == "IntentRequest"
    #   return
    #   intent_name = params["request"]["intent"]["name"]
    #   case intent_name
    #   when "RateWineIntent"
    #     return Alexa::RateWine.new().respond(params)
    #   when "GetAverageRatingIntent"
    #   when "GetWineStatsIntent"
    #   else
    #     make_plaintext_response("Hello #{host.taster.handle}. I have opened tasting #{open_tasting.name}. You can rate a wine, get my rating, get average rating, or get tasting stats. Which would you like to do?")
    #   end
    # end

    # Dialog


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

end
