class TastingWineSerializer < ActiveModel::Serializer
  attributes :id,
    :average_rating,
    :tasting_id,
    :wine,
    :wine_id,
    :wine_number,
    :price


  def wine
    WineSerializer.new(object.wine)
  end

end
