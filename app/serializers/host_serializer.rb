class HostSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :email, :tasting_count,

  def name
    object.taster.name
  end

  def handle
    object.taster.handle
  end

  def email
    object.taster.user.email
  end

  def tasting_count
    object.tastings.count
  end


end
