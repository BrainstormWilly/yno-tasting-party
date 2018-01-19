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

  def status
    return "Completed" if object.is_completed?
    return "Closed" if object.is_closed?
    return "Open" if object.is_open?
    "Pending"
  end

end
