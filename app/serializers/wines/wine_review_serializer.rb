class Wines::WineReviewSerializer < ActiveModel::Serializer
  attributes :id,
    :taster_id,
    :tasting_id,
    :tasting,
    :rating,
    :average_rating,
    :comments,
    :wine_number,
    :wine_id,
    :wine

  def average_rating
    object.average_rating
  end

  def wine
    ::WineSerializer.new(object.wine)
  end

  def tasting
    Wines::TastingSerializer.new(object.tasting)
  end

end
