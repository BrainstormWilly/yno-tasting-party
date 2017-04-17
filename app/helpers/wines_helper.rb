module WinesHelper

  # needs test
  def avg_wine_rating_overall(wine)
    return "unrated" if wine.wine_reviews.empty?
    wine.wine_reviews.sum{ |wr| wr.rating }/wine.wine_reviews.count
  end

end
