class Tasters::Invites::GuestSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle

  def name
    object.taster.name
  end

  def handle
    object.taster.handle
  end


end
