class ConnectionSerializer < ActiveModel::Serializer
  attributes :id, :host_id, :taster_id, :taster_name, :host_name, :connected_at

  def taster_name
    object.taster.name
  end

  def host_name
    object.host.taster.name
  end

end
