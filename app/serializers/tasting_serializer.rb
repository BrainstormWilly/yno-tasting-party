class TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :open_at,
    :is_open,
    :is_pending,
    :is_closed,
    :is_completed,
    :tasting_wines,
    :wine_reviews,
    :guests,
    :tasting_progress

  def guests
    object.guests.map do |g|
      Tastings::GuestSerializer.new(g)
    end
  end

  def wine_reviews
    object.wine_reviews do |wr|
      Tastings::WineReviewSerializer.new(wr)
    end
  end

  def tasting_wines
    object.tasting_wines do |tw|
      Tastings::TastingWineSerializer.new(tw)
    end
  end

  def is_open
    object.is_open?
  end

  def is_pending
    object.open_at > Time.current
  end

  def is_closed
    object.is_closed?
  end

  def is_completed
    object.is_completed?
  end

  def tasting_progress
    total = object.tasting_wines.count * object.guests.count
    unrated = object.wine_reviews.select{ |wr| wr.unrated? }.count
    (total-unrated)/total.to_f
  end

end
