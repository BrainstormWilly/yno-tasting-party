class Tastings::Show::Pending::GuestSerializer < ActiveModel::Serializer
  attributes :id,
  :invited,
  :confirmed,
  :taster_id,
  :taster,
  :tasting_id,
  :taster_number

  def taster
    ::TasterSerializer.new(object.taster)
  end

  # def wine_reviews
  #   object.taster.wine_reviews.select{ |wr| wr.tasting==object.tasting }
  #     .map{ |wr| ::WineReviewSerializer.new(wr) }
  # end

end
