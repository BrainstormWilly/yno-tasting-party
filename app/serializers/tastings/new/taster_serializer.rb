class Tastings::New::TasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :user_id, :user

  def user
    UserSerializer.new(object.user)
  end

end
