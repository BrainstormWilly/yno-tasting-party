class Tasters::Invites::UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :invited_by_id, :taster

  def taster
    TasterSerializer.new(object.taster)
  end

end
