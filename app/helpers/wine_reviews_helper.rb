module WineReviewsHelper

  def rating_label(rating)
    case rating
      when 1
        return "1 (Yuck!)"
      when 2
        return "2 "
      when 3
        return "3 "
      when 4
        return "4 "
      else
        "5 (Delicious!)"
    end
  end

end
