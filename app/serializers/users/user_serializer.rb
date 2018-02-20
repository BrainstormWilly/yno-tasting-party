class Users::UserSerializer < ActiveModel::Serializer
  attributes :id, :invited_by_id, :reset_password_token, :email, :taster, :host

  def taster
    return ::TasterSerializer.new(object.taster)
  end

  def host
    return Users::HostSerializer.new(object.taster.host) if object.taster.host
    nil
  end

end
