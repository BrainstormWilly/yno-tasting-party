class TastingSerializer < ActiveModel::Serializer
  attributes :id, :name, :open_at, :is_open, :is_pending, :is_closed, :is_completed, :tasting_progress

  has_many :guests
  has_many :tasting_wines
  has_many :wine_reviews

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
