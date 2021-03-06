class GuestSerializer < ActiveModel::Serializer
  attributes :id,
    :taster_id,
    :taster,
    :taster_number,
    :tasting_id,
    :invited,
    :confirmed

  # belongs_to :taster

  # use if we want to restrict model access
  # def taster
  #   TasterSerializer.new(object.taster).attributes
  # end

  def taster
    TasterSerializer.new(object.taster)
  end

  # def tasting_progress
  #   total = object.tasting.tasting_wines.count
  #   left = object.taster.wine_reviews.select{ |wr| wr.tasting_id==object.tasting_id && wr.unrated? }.count
  #   (total-left)/total.to_f
  # end
  #
  # def wine_reviews
  #   object.taster.wine_reviews.select{ |wr| wr.tasting==object.tasting }
  # end

end
