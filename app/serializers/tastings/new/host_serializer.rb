class Tastings::New::HostSerializer < ActiveModel::Serializer
  attributes :id, :taster, :locations

  def taster
    Tastings::New::TasterSerializer.new(object.taster)
  end

  def locations
    object.host_locations.map do |hl|
      HostLocationSerializer.new(hl)
    end
  end

end
