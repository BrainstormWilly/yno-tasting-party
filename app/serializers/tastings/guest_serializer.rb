class Tastings::GuestSerializer < ActiveModel::Serializer
  attributes :id, :taster_id, :tasting_id, :tasting_progress, :wine_reviews, :taster_number


  def tasting_progress
    total = object.tasting.tasting_wines.count
    left = object.taster.wine_reviews.select{ |wr| wr.tasting_id==object.tasting_id && wr.unrated? }.count
    (total-left)/total.to_f
  end

  def wine_reviews
    object.taster.wine_reviews.select{ |wr| wr.tasting==object.tasting }
  end

end
