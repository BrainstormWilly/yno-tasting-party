class Api::Alexa::V1::RequestsController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # force_ssl if: :ssl_configured?
  # prepend_before_action :set_access_token_in_params
  # before_action :doorkeeper_authorize!

  def default
    # Alexa Request Header Verification
    verification_success = AlexaVerifier.valid?(request)

    request_type = params["request"]["type"]

    # p "@@@@@@@@@ Request Type: #{request_type}"
    # p "@@@@@@@@@ Verification Success: #{verification_success}"

    # Verification invalid
    return render json: {error: "Bad RequestsController"}.to_json, status: 400 unless verification_success

    # No accessToken
    return request_account_linking unless token_from_params

    # create/find user, taster, host status with token
    token_finder = ::Alexa::AccessTokenFinder.new(token_from_params)

    # could not get Amazon user profile (shouldn't happen)
    return make_plaintext_response("I'm sorry. I'm having trouble locating your Amazon account. Go to alexa dot amazon dot com to learn more.", true) if token_finder.amazon_user.nil?

    # could not find a Yno User
    return play_join_us if token_finder.yno_user.blank?

    # could not find a Yno Taster (impossible through the interface)
    return make_plaintext_response("I'm sorry. There appears to be a problem with your Yno taster account. Go to wino tasting dot com, check your profile, and try again.", true) if token_finder.yno_taster.blank?

    # could not find a Yno Host
    return make_plaintext_response("Hello #{token_finder.yno_taster.handle}. You have successfully linked me to your wino taster account. However, I can only help with you with tastings that you host. Go to wino tasting dot com slash alexa to learn more.", true) if token_finder.yno_host.blank?

    open_tasting = Tasting.get_open_for_host(token_finder.yno_host)
    if open_tasting.blank?
      pending_tasting = Tasting.get_pending_for_host(token_finder.yno_host)
      if pending_tasting.present?
        open_in_secs = (pending_tasting.open_at - Time.current)
        open_in_secs = open_in_secs.round
        time_hash = [open_in_secs, "second".pluralize(open_in_secs)]
        time_hash = [(open_in_secs/60).round, "minute".pluralize(open_in_secs/60)] if time_hash[0]>59
        time_hash = [(open_in_secs/3600).round, "hour".pluralize(open_in_secs/3600)] if time_hash[0]>59
        time_hash = [(open_in_secs/86400).round, "day".pluralize(open_in_secs/86400)] if time_hash[0]>24
        return make_plaintext_response("Hello #{token_finder.yno_taster.handle}, I see a pending tasting called, #{pending_tasting.name}. Come back in about #{time_hash[0]} #{time_hash[1]} or after you open it in your wino tasting app.", true)
      end
    end

    # No open or pending tastings
    return make_plaintext_response("Hello #{token_finder.yno_taster.handle}, I don't see any open or pending tastings for you. I can only help you with open tastings. Go to wino tasting dot com slash alexa to learn more.", true) unless open_tasting

    # Launch request
    return play_preamble(open_tasting) if request_type == "LaunchRequest"



    # Intent request
    if request_type == "IntentRequest"
      intent = params["request"]["intent"]["name"]
      # p "@@@@@@@@@ Intent Request: #{intent}"
      if intent == "RateWineIntent"
        svc = ::Alexa::RateWineIntent.new(open_tasting, params)
      elsif intent == "GetTastingStatsIntent"
        svc = ::Alexa::GetTastingStatsIntent.new(open_tasting, params)
      elsif intent == "GetAverageWineRatingIntent"
        svc = ::Alexa::GetAverageWineRatingIntent.new(open_tasting, params)
      elsif intent == "AddWineCommentIntent"
        svc = ::Alexa::AddWineCommentIntent.new(open_tasting, params)
      elsif intent == "GetTasterWineRatingsIntent"
        svc = ::Alexa::GetTasterWineRatingsIntent.new(open_tasting, params)
      else
        svc = ::Alexa::AmazonIntents.new(params)
      end

      render json: svc.response
    end
  end

  # DEPRECATED: no longer using Doorkeeper. Now using Amazon Oauth
  # def current_doorkeeper_host
  #   Host.find_by(taster: current_doorkeeper_taster)
  # end
  #
  # def current_doorkeeper_taster
  #   Taster.find_by(user: current_doorkeeper_user )
  # end
  #
  # def current_doorkeeper_user
  #   @current_doorkeeper_user ||= User.find(doorkeeper_token.resource_owner_id)
  # end



  private

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

  def play_join_us
    render json: {
      "version": "1.0",
      "sessionAttributes": { },
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "Thank you for enabling wino tasting. In order to use this skill, you must sign up, and open a tasting on our website. Go to why, en, oh, tasting, dot com, slash how, to learn more."
        },
        "card":{
          "type": "Simple",
          "title": "Learn more about Yno Tasting",
          "content": "https://ynotasting.com/how"
        },
        "shouldEndSession": true
      }
    }
  end

  def play_preamble(tasting)
    render json: {
      "version": "1.0",
      "sessionAttributes": { },
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak>
                      <s>Welcome to<break time='.1s'/> Yno Wine Tasting</s>
                      <s>Your tasting<break time='.1s'/> <prosody pitch='low'>#{tasting.name}</prosody><break time='.1s'/> is currently open</s>
                      <s>While tasting you can ask me to do the following:</s>
                      <s>Rate a wine</s>
                      <s>Get an average rating for a wine</s>
                      <s>Get wine ratings for a taster</s>
                      <s>Add a comment for a wine</s>
                      <s>Or</s>
                      <s>Get tasting statistics</s>
                      <s>Which would you like to do?</s>
                    </speak>"
        },
        "card":{
          "type": "Simple",
          "title": "Yno Tasting Options",
          "content": "Rate a wine.\nGet an average rating for a wine.\nGet wine ratings for a taster.\nAdd a comment for a wine.\nGet tasting stats."
        },
        "shouldEndSession": false
      }
    }
  end

  def request_account_linking
    render json: {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "You must authenticate with your Amazon Account to use this skill. I sent instructions for how to do this in your Alexa App"
        },
        "card": {
          "type": "LinkAccount"
        },
        "shouldEndSession": true
      },
      "sessionAttributes": {}
    }
  end

end
