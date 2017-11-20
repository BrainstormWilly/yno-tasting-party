class TastingWineSerializer < ActiveModel::Serializer
  attributes :id, :wine_number, :tasting_id, :average_rating, :wine

  def average_rating
    object.tasting.average_rating_for_wine(object.wine_number)
  end

  def wine
    WineSerializer.new(object.wine)
  end

end
