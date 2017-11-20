class HostSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :email, :tasting_count, :locations

  def name
    object.taster.name
  end

  def handle
    object.taster.handle
  end

  def email
    object.taster.user.email
  end

  def tasting_count
    object.tastings.count
  end

  def locations
    object.host_locations.map do |hl|
      HostLocationSerializer.new(hl)
    end
  end

end
