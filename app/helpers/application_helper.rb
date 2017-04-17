module ApplicationHelper

  def tasting_badge(tasting)
    if tasting.is_open?
      span = "<span class=\"badge badge-positive\">Open</span>"
    elsif tasting.is_completed?
      span = "<span class=\"badge\">Completed</span>"
    elsif Time.current < tasting.open_at
      span = "<span class=\"badge badge-future\">#{tasting.open_at.getlocal.strftime('%b %-d, %l:%M%P %Z')}</span>"
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

  # def in_user_time(time)
  #   time.in_time_zone
  # end

  # def current_taster_exists?
  #   Taster.where(user: current_user).count > 0
  # end

end
