class Tastings::List::TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :description,
    :open_at,
    :close_at,
    :private,
    :location_id,
    :location,
    :host_id,
    :host,
    :is_open,
    :is_pending,
    :is_closed,
    :is_completed,
    :status,
    :tasting_wine_count,
    :guest_count

  def host
    HostSerializer.new(object.host)
  end

  def location
    LocationSerializer.new(object.location)
  end

  def tasting_wine_count
    object.tasting_wines.count
  end

  def guest_count
    object.guests.count
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
