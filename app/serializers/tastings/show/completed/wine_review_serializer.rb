class Tastings::Show::Completed::WineReviewSerializer < ActiveModel::Serializer
  attributes :id,
    :taster,
    :taster_id,
    :tasting_id,
    :rating,
    :average_rating,
    :comments,
    :unrated,
    :wine_number,
    :wine_id,
    :wine

  def average_rating
    object.average_rating
  end

  def taster
    ::TasterSerializer.new(object.taster)
  end

  def unrated
    false
  end

  def wine
    ::WineSerializer.new(object.wine) if object.wine
  end


end
