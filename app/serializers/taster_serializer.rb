class TasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :guest_count, :review_count, :invite_count

  def guest_count
    object.guests.count - self.invite_count
  end

  def review_count
    object.wine_reviews.select{ |r| r.wine }.count
  end

  def invite_count
    object.invites.count
  end

end
