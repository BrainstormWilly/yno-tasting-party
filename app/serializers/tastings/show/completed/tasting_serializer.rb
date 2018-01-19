class Tastings::Show::Completed::TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :close_at,
    :closed_at,
    :completed_at,
    :description,
    :guests,
    :host,
    :host_id,
    :host_is_not_tasting,
    :location,
    :location_id,
    :name,
    :open_at,
    :is_open,
    :is_pending,
    :is_closed,
    :is_completed,
    :tasting_wines,
    :taster_wine_reviews

  def guests
    object.guests.map do |g|
      Tastings::Show::Completed::GuestSerializer.new(g)
    end
  end

  def host
    ::HostSerializer.new(object.host)
  end

  def location
    ::LocationSerializer.new(object.location)
  end

  def host_is_not_tasting
    object.guests.select{ |g| g.taster.user_id==object.host.taster.user_id }.count==0
  end

  def taster_wine_reviews
    object.wine_reviews
      .select{ |wr| wr.taster.user_id==current_user.id }
      .map{ |wr| Tastings::Show::Completed::WineReviewSerializer.new(wr) }
  end

  def tasting_wines
    object.tasting_wines.map do |tw|
      ::TastingWineSerializer.new(tw)
    end
  end

  def is_open
    object.is_open?
  end

  def is_pending
    object.is_pending?
  end

  def is_closed
    object.is_closed? && !object.is_completed?
  end

  def is_completed
    object.is_completed?
  end


  # private
  #
  #   def current_guest
  #     object.guests.select{ |g| g.taster.user_id==current_user.id }.first
  #   end

end
