class Tastings::Show::Pending::TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :description,
    :open_at,
    :close_at,
    :private,
    :is_open,
    :is_pending,
    :is_closed,
    :is_completed,
    :location_id,
    :location,
    :host_id,
    :host,
    :host_is_not_tasting,
    :guests,
    :tasting_wines

  def host
    Tastings::Show::Pending::HostSerializer.new(object.host)
  end

  def host_is_not_tasting
    object.guests.select{ |g| g.taster.user_id==object.host.taster.user_id }.count==0
  end

  def location
    ::LocationSerializer.new(object.location)
  end

  def tasting_wines
    object.tasting_wines.map do |tw|
      ::TastingWineSerializer.new(tw)
    end
  end

  def guests
    object.guests.map do |g|
      Tastings::Show::Pending::GuestSerializer.new(g)
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
end
