class Users::HostSerializer < ActiveModel::Serializer
  attributes :id, :locations, :connections

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
