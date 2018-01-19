class Tastings::Show::Closed::WineReviewSerializer < ActiveModel::Serializer
  attributes :id,
    :taster,
    :taster_id,
    :tasting_id,
    :rating,
    :average_rating,
    :comments,
    :wine_number,
    :wine_id,
    :wine,
    :unrated

  def taster
    
    ::TasterSerializer.new(object.taster)
  end

  def wine
    return ::WineSerializer.new(object.wine) if object.wine
    nil
  end

  def unrated
    object.unrated?
  end

  def average_rating
    object.average_rating
  end

end
