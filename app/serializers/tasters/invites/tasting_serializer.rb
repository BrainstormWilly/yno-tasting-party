class Tasters::Invites::TastingSerializer < ActiveModel::Serializer
  attributes :id, :name, :open_at, :is_open, :is_pending, :wines, :guests, :host, :location

  def guests
    object.guests.map do |g|
      Tasters::Invites::GuestSerializer.new(g)
    end
  end

  def host
    HostSerializer.new(object.host)
  end

  def location
    LocationSerializer.new(object.location)
  end

  def wines
    object.tasting_wines.map do |tw|
      Tasters::Invites::TastingWineSerializer.new(tw)
    end
  end

  def is_open
    object.is_open?
  end

  def is_pending
    object.open_at > Time.current
  end


end
