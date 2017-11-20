class HostLocationSerializer < ActiveModel::Serializer
  attributes :id, :primary, :location

  def location
    LocationSerializer.new(object.location)
  end

end
