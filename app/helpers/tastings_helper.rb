module TastingsHelper

  def taster_has_invitations?(taster)
    gs = Guest.where(taster: taster)
    gs.each do |g|
      if g.invitation_open?
        return true
      end
    end
    false
  end

  def taster_has_tastings?(taster)
    gs = Guest.where(taster: taster).where.not(confirmed: nil)
    gs.each do |g|
      if g.tasting_confirmed? && g.tasting.host.taster != taster
        return true
      end
    end
    false
  end

  def current_guest(tasting, taster)
    Guest.where(tasting: tasting, taster: taster).first
  end

  def review_badge_color(rating)
    if rating > 3
      return "success"
    elsif rating < 3
      return "danger"
    end
    "default"
  end

  def tasting_badge(tasting)
    if tasting.is_open?
      span = "<span class=\"badge badge-success badge-pill\">Open</span>"
    elsif Time.current < tasting.open_at
      span = "<span class=\"badge badge-default badge-pill\">#{tasting.open_at.strftime('%b %-d, %l:%M%P')}</span>"
    else
      span = "<span class=\"badge badge-danger badge-pill\">Closed</span>"
    end
    span.html_safe
  end

  def tasting_has_reviews?(tasting)
    WineReview.tasting_has_reviews?(tasting.id)
  end

  # def tasting_is_open(tasting)
  #   now = DateTime.now
  #   if now < tasting.open_at
  #     return false
  #   elsif WineReview.all_unrated.count > 0
  #     return true
  #   elsif now > tasting.close_at
  #     return false
  #   end
  #   true
  # end


end
