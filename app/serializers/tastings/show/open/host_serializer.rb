class Tastings::Show::Open::HostSerializer < ActiveModel::Serializer
  attributes :id, :taster_id, :taster, :locations, :connections

  def taster
    Tastings::Show::Open::TasterSerializer.new(object.taster)
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
