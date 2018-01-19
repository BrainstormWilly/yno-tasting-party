class Tastings::Show::Open::Status::WineReviewSerializer < ActiveModel::Serializer
  attributes :id,
    :all_reviews,
    :average_rating,
    :comments,
    :rating,
    :taster_id,
    :tasting_id,
    :wine_number

  def average_rating
    object.average_rating
  end

  def all_reviews
    object.tasting.wine_reviews.where(wine_number:object.wine_number).map do |wr|
      ::WineReviewSerializer.new(wr)
    end
  end

end
