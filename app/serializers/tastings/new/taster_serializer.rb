class Tastings::New::TasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :user_id

end
