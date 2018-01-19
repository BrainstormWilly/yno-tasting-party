class Users::UserSerializer < ActiveModel::Serializer
  attributes :id, :invited_by_id, :email, :taster, :host

  def taster
    ::TasterSerializer.new(object.taster)
  end

  def host
    return Users::HostSerializer.new(object.taster.host) if object.taster.host
    nil
  end

end
