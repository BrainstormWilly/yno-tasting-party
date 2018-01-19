class Tastings::Show::Closed::GuestSerializer < ActiveModel::Serializer
  attributes :id,
  :invited,
  :confirmed,
  :taster_id,
  :taster,
  :tasting_id,
  :tasting_progress,
  :wine_reviews,
  :taster_number

  def taster
    ::TasterSerializer.new(object.taster)
  end

  def tasting_progress
    total = object.tasting.tasting_wines.count
    left = object.taster.wine_reviews.select{ |wr| wr.tasting_id==object.tasting_id && wr.unrated? }.count
    (total-left)/total.to_f
  end

  def wine_reviews
    object.taster.wine_reviews.select{ |wr| wr.tasting==object.tasting }
      .map{ |wr| ::WineReviewSerializer.new(wr) }
  end

end
