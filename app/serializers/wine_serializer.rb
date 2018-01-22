class WineSerializer < ActiveModel::Serializer
  attributes :id, :name, :vintage, :full_name, :review_count, :average_rating

  def full_name
    "#{object.vintage} #{object.name}"
  end

  def vintage
    object.vintage_name
  end

  def review_count
    object.wine_reviews.count
  end

  def average_rating
    total_ratings = object.wine_reviews.inject(0){ |sum,wr| sum + wr.rating }
    (total_ratings/review_count).round(1)
  end

end
