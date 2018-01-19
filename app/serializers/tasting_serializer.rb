class TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :open_at,
    :host_id,
    :host,
    :is_open,
    :is_pending,
    :is_closed,
    :is_completed,
    :tasting_wines,
    :wine_reviews,
    :guests

  def host
    HostSerializer.new(object.host)
  end

  def guests
    object.guests.map do |g|
    GuestSerializer.new(g)
    end
  end

  def wine_reviews
    object.wine_reviews.map do |wr|
      WineReviewSerializer.new(wr)
    end
  end

  def tasting_wines
    object.tasting_wines.map do |tw|
      TastingWineSerializer.new(tw)
    end
  end

  def is_open
    object.is_open?
  end

  def is_pending
    object.is_pending?
  end

  def is_closed
    object.is_closed? && !object.is_completed?
  end

  def is_completed
    object.is_completed?
  end

  # def tasting_progress
  #   total = object.tasting_wines.count * object.guests.count
  #   unrated = object.wine_reviews.select{ |wr| wr.unrated? }.count
  #   (total-unrated)/total.to_f
  # end

end
