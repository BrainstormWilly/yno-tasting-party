class Wines::WineReviewSerializer < ActiveModel::Serializer
  attributes :id,
    :taster_id,
    :tasting_id,
    :tasting,
    :rating,
    :comments,
    :taster_average_rating,
    :taster_review_count,
    :wine_number,
    :wine_id,
    :wine,
    :updated_at

  def taster_average_rating
    object.taster_average_rating
  end

  def taster_review_count
    object.taster_review_count
  end

  def wine
    ::WineSerializer.new(object.wine)
  end

  def tasting
    Wines::TastingSerializer.new(object.tasting)
  end

end
