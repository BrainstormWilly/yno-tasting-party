class Tastings::Show::Pending::TasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :user_id, :user, :status

  def user
    ::UserSerializer.new(object.user)
  end

end
