class Wines::TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :open_at,
    :host_id,
    :host,
    :tasting_wines,
    :guests

  def host
    ::HostSerializer.new(object.host)
  end

  def guests
    object.guests.map do |g|
      ::GuestSerializer.new(g)
    end
  end

  def tasting_wines
    object.tasting_wines.map do |tw|
      ::TastingWineSerializer.new(tw)
    end
  end

end
