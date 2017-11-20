class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :raw_invitation_token


end
