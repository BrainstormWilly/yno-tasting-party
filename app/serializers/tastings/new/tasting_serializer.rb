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

end
