class ApplicationController < ActionController::Base

  force_ssl if: :ssl_configured?
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }


  private

    def current_taster
      return nil if !current_user
      Taster.find_by(user_id: current_user.id)
    end

    def current_host
      return nil if !current_taster
      Host.find_by(taster_id: current_taster.id)
    end

    def invited_by_host
      return nil if !current_user
      taster = Taster.find_by(user_id: current_user.invited_by_id)
      Host.find_by(taster: taster)
    end

    def client_timezone
      lat = request.location.latitude == 0.0 ? 38.440429 : request.location.latitude rescue 38.440429
      lng = request.location.longitude == 0.0 ? -122.714055 : request.location.longitude rescue -122.714055
      Timezone.lookup(lat,lng)
    end

    def client_timezone_str(time, abbr=false)
      begin
        return "#{client_timezone.time_with_offset(time).strftime("%b %-d, %l:%M%P %Z")} #{client_timezone.abbr(time)}" if abbr
        "#{client_timezone.time_with_offset(time).strftime("%A, %B %-d at %l:%M%P")} #{client_timezone.abbr(time)}"
      rescue
        return time.strftime("%b %-d, %l:%M%P %Z")
        time.strftime("%A, %B %-d at %l:%M%P")
      end
    end

    def ssl_configured?
      Rails.env.production?
    end

end
