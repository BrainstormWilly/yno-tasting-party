module TastingsHelper

  def taster_has_invitations?(taster)
    ts = Tasting.joins(:guests)
          .where(guests: {taster: taster})
          .where.not(guests: {invited: nil})
          .where(guests: {confirmed: nil})
    ts.each do |t|
      return true if !t.is_closed?
    end
    # gs = Guest.where(taster: taster)
    # gs.each do |g|
    #   if g.invitation_open?
    #     return true
    #   end
    # end
    false
  end

  def taster_has_tastings?(taster)
    ts = Tasting.joins(:guests, )
          .where(guests: {taster: taster})
          .where.not(guests: {confirmed: nil})
    ts.each do |t|
      return true if t.host.taster != taster
    end
    # gs = Guest.where(taster: taster).where.not(confirmed: nil)
    # gs.each do |g|
    #   if g.tasting_confirmed? && g.tasting.host.taster != taster
    #     return true
    #   end
    # end
    false
  end

  def current_guest(tasting, taster)
    tasting.guests.where(taster: taster).first
    # Guest.where(tasting: tasting, taster: taster).first
  end

  def review_badge_color(rating)
    if rating > 3
      return "badge-positive"
    elsif rating < 3
      return "badge-negative"
    end
    "badge-neutral"
  end

  def taster_has_reviews?(tasting, taster)
    # reviews = WineReview.where(tasting: tasting).where(taster: taster)
    reviews = tasting.wine_reviews.where(taster: taster)
    reviews.each do |wr|
      return true if !wr.unrated?
    end
    false
  end

  def taster_last_review(tasting, taster)
    tasting.wine_reviews.reorder("updated_at desc").where(taster: taster).first
    # WineReview.reorder("updated_at desc").where(tasting: tasting).where(taster: taster).first
  end

  def tasting_badge(tasting)
    if tasting.is_open?
      span = "<span class=\"badge badge-positive\">Open</span>"
    elsif tasting.is_completed?
      span = "<span class=\"badge\">Completed</span>"
    elsif Time.current < tasting.open_at
      span = "<span class=\"badge badge-future\">#{tasting.open_at.strftime('%b %-d, %l:%M%P')}</span>"
    else
      span = "<span class=\"badge badge-negative\">Closed</span>"
    end
    span.html_safe
  end

  def tasting_status(tasting)
    if tasting.is_open?
      return "well-open"
    elsif tasting.is_completed?
      return ""
    elsif Time.current < tasting.open_at
      return "well-future"
    end
    "well-closed"
  end

  def tasting_has_reviews?(tasting)
    # WineReview.tasting_has_reviews?(tasting)
    tasting.wine_reviews.each do |wr|
      return true if !wr.unrated?
    end
    false
  end

  def wine_number_btn_color(tasting_wine, wine_number)
    return "btn-primary" if tasting_wine.wine_number == wine_number
    "btn-default"
  end

  def avg_tasting_wine_rating(tasting_wine)
    return "unrevealed" if tasting_wine.wine_number == 0
    reviews = tasting_wine.tasting.wine_reviews.where(wine_number: tasting_wine.wine_number)
    # reviews = WineReview.where(tasting_id: tasting_wine.tasting_id).where(wine_number: tasting_wine.wine_number)
    reviews.inject(0){ |sum, r| sum + r.rating }.fdiv(reviews.count)
  end

  def rating_sorted_tasting_wines(tasting)
    tasting.tasting_wines.sort{ |a,b|
      self.avg_tasting_wine_rating(b) <=> self.avg_tasting_wine_rating(a)
    }
  end

  def guest_rating_sorted_wine_reviews(guest)
    guest.tasting.wine_reviews.where(taster: guest.taster).reorder("rating desc")
  end

  def rating_fill_percent_for_tasting_wine(tasting_wine)
    "#{100*(avg_tasting_wine_rating(tasting_wine)/5)}%"
  end

  def rating_fill_color_for_tasting_wine(tasting_wine)
    self.rating_fill_color_for_rating(self.avg_tasting_wine_rating(tasting_wine))
  end

  def rating_fill_color_for_rating(rating)
    if rating < 3
      return "bad"
    elsif rating < 4
      return "ok"
    elsif rating < 5
      return "good"
    end
    "excellent"
  end

  def tasting_wine_from_wine_review(wine_review)
    wine_review.tasting.tasting_wines.where(wine_number: wine_review.wine_number).first
  end

  def guest_tasting_wine_rating(tasting_wine, taster)
    # review = WineReview.where(tasting_id: tasting_wine.tasting_id).where(wine_number: tasting_wine.wine_number).where(taster_id: taster.id).first
    return "Unrated" if tasting_wine.wine_number == 0
    review = tasting_wine.tasting.wine_reviews.where(wine_number: tasting_wine.wine_number).where(taster: taster).first
    return "Unrated" unless review
    review.rating
  end

  def location_style_for_tasting(tasting, location)
    return "list-group-item-success" if tasting.location==location
    ""
  end

end
