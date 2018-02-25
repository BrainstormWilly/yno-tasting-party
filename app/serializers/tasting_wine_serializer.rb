class TastingWineSerializer < ActiveModel::Serializer
  attributes :id,
    :average_rating,
    :completed_review_count,
    :tasting_id,
    :wine,
    :wine_id,
    :wine_number,
    :price

  def average_rating
    return 0 unless object.average_rating
    object.average_rating
  end

  def wine
    WineSerializer.new(object.wine)
  end

  def completed_review_count
    object.completed_review_count
  end

end
