class Tasters::Invites::TasterSerializer < ActiveModel::Serializer
  attributes :id, :full_handle, :name, :handle, :user_id, :invites

  def invites
    object.invites.map do |i|
      Tasters::Invites::TastingSerializer.new(i)
    end
  end

  def full_handle
    return "#{object.name} (#{object.handle})" if object.handle && object.name
    return object.name if object.name
    object.user.email.gsub(/.{0,4}@/, "***@")
  end
end
