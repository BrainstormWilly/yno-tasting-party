class UserSerializer < ActiveModel::Serializer
  attributes :id, :invited_by_id
  # delegate :current_user, to: :scope

end
