class HostSerializer < ActiveModel::Serializer
  attributes :id, :locations, :taster_id, :taster, :connections

  # def name
  #   object.taster.name
  # end
  #
  # def handle
  #   object.taster.handle
  # end
  #
  # def email
  #   object.taster.user.email
  # end
  #
  # def tasting_count
  #   object.tastings.count
  # end
  def taster
    TasterSerializer.new(object.taster)
  end

  def locations
    object.host_locations.map do |hl|
      HostLocationSerializer.new(hl)
    end
  end

  def connections
    object.connections
      .select{ |c| c.taster.status=="active"}
      .map{ |c| ConnectionSerializer.new(c) }
  end

end
