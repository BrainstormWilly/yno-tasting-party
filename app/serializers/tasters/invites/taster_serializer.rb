class Tasters::Invites::TasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :user_id, :invites

  def invites
    object.invites.map do |i|
      Tasters::Invites::TastingSerializer.new(i)
    end
  end

end
