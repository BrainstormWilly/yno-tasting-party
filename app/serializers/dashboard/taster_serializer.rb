class Dashboard::TasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :user_id, :user, :tasting_count, :review_count, :invite_count

  def user
    UserSerializer.new(object.user)
  end

  def tasting_count
    if current_host
      hosted_tastings = current_host.tastings.map{ |ht| ht.id }
    else
      hosted_tastings = []
    end
    guest_tastings = object.guests.select{ |g| g.tasting_confirmed? }
      .map{ |g| g.tasting.id }
    total_tastings = hosted_tastings.concat(guest_tastings)
    total_tastings.uniq!
  end

  def review_count
    object.wine_reviews.count
  end

  def invite_count
    object.invites.count
  end

end
