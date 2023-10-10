class ApplicationController < ActionController::Base

  # force_ssl if: :ssl_configured?
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

    # DEPRECATED
    # unreliable and too expensive
    # timezone setting now put on Location model
    def client_timezone
      # default_lat = 38.440429
      # default_lng = -122.714055

      lat = request.location.latitude == 0.0 ? 38.440429 : request.location.latitude rescue 38.440429
      lng = request.location.longitude == 0.0 ? -122.714055 : request.location.longitude rescue -122.714055
      Timezone.lookup(lat,lng)
    end

    def client_timezone_str(time, abbr=false, timezone=nil)
      if timezone
        tz = Timezone[timezone]
      else
        tz = client_timezone
      end
      begin
        return "#{tz.time_with_offset(time).strftime("%b %-d, %l:%M%P %Z")} #{tz.abbr(time)}" if abbr
        "#{tz.time_with_offset(time).strftime("%A, %B %-d at %l:%M%P")} #{tz.abbr(time)}"
      rescue
        return time.strftime("%b %-d, %l:%M%P %Z")
        time.strftime("%A, %B %-d at %l:%M%P")
      end
    end




    # def layout_name
    #     if params[:layout] == 0
    #         false
    #     else
    #         'application'
    #     end
    # end

    def ssl_configured?
      Rails.env.production?
    end

end
