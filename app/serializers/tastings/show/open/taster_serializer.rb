class Tastings::Show::Open::TasterSerializer < ActiveModel::Serializer
  attributes :id, :full_handle, :name, :handle, :user_id, :user, :status, :is_host

  def user
    ::UserSerializer.new(object.user)
  end

  def name
    return "(Unconfirmed invite)" if object.name.nil?
    object.name
  end

  def full_handle
    return "#{object.name} (#{object.handle})" if object.handle && object.name
    return object.name if object.name
    object.user.email.gsub(/.{0,4}@/, "***@")
  end

  def is_host
    !object.host.nil?
  end

end
