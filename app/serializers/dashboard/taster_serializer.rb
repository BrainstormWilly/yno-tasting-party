class Dashboard::TasterSerializer < ActiveModel::Serializer
  attributes :id,
    :full_handle,
    :name,
    :handle,
    :is_host,
    :user_id,
    :user,
    :tasting_count,
    :review_count,
    :invite_count

  def user
    UserSerializer.new(object.user)
  end

  def name
    return "(Unconfirmed invite)" if object.name.nil?
    object.name
  end

  def full_handle
    return "#{object.name} (#{object.handle})" if object.handle && object.name
    return object.name if object.name
    object.user.email.gsub(/.{0,4}@/, "***@")
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

  def is_host
    !object.host.nil?
  end

end
