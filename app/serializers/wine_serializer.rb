class WineSerializer < ActiveModel::Serializer
  attributes :id, :name, :vintage, :full_name, :review_count, :average_rating

  def full_name
    "#{object.vintage_name} #{object.name}"
  end

  def vintage
    object.vintage_name
  end

  def review_count
    object.wine_reviews.count
  end

  def average_rating
    object.average_rating
  end

end
