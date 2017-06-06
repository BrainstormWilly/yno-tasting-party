class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  force_ssl if: :ssl_configured?
  protect_from_forgery with: :null_session

  private

    def current_taster
      Taster.find_by(user_id: current_user.id)
    end

    def current_host
      Host.find_by(taster_id: current_taster.id)
    end

    def invited_by_host
      taster = Taster.find_by(user_id: current_user.invited_by_id)
      Host.find_by(taster: taster)
    end

    def client_timezone
      lat = request.location.latitude == 0.0 ? 38.440429 : request.location.latitude rescue 38.440429
      lng = request.location.longitude == 0.0 ? -122.714055 : request.location.longitude rescue -122.714055
      Timezone.lookup(lat,lng)
    end

    def client_timezone_str(time, abbr=false)
      return "#{client_timezone.time_with_offset(time).strftime("%b %-d, %l:%M%P %Z")} #{client_timezone.abbr(time)}" if abbr
      "#{client_timezone.time_with_offset(time).strftime("%A, %B %-d at %l:%M%P")} #{client_timezone.abbr(time)}"
    end

    def ssl_configured?
      Rails.env.production?
    end

end
