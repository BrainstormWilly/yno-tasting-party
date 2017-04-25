module ApplicationHelper

  def tasting_badge(tasting)
    if tasting.is_open?
      span = "<span class=\"badge badge-positive\">Open</span>"
    elsif tasting.is_completed?
      span = "<span class=\"badge\">Completed</span>"
    elsif Time.current < tasting.open_at
      span = "<span class=\"badge badge-future\">#{self.client_timezone_str(tasting.open_at, true)}</span>"
    else
      span = "<span class=\"badge badge-negative\">Closed</span>"
    end
    span.html_safe
  end

  def current_taster
    Taster.find_by(user: current_user)
  end

  def current_host
    Host.find_by(taster: current_taster)
  end


  def client_timezone
    lat = request.location.latitude == 0.0 ? 38.440429 : request.location.latitude
    lng = request.location.longitude == 0.0 ? -122.714055 : request.location.longitude
    Timezone.lookup(lat, lng)
  end

  def client_timezone_str(time, abbr=false)
    return "#{self.client_timezone.time_with_offset(time).strftime("%b %-d, %l:%M%P %Z")} #{self.client_timezone.abbr(time)}" if abbr
    "#{self.client_timezone.time_with_offset(time).strftime("%A, %B %-d at %l:%M%P")} #{self.client_timezone.abbr(time)}"
  end


  # def in_user_time(time)
  #   time.in_time_zone
  # end

  # def current_taster_exists?
  #   Taster.where(user: current_user).count > 0
  # end

end
