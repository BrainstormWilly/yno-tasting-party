class Tastings::New::TastingSerializer < ActiveModel::Serializer
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
    :guests,
    :tasting_wines

  def host
    ::Tastings::New::HostSerializer.new(object.host)
  end

  def location
    ::LocationSerializer.new(object.location)
  end

  def tasting_wines
    object.tasting_wines do |tw|
    ::TastingWineSerializer.new(tw)
    end
  end

  def guests
    object.guests do |g|
      Tastings::New::GuestSerializer.new(g)
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
