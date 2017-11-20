class LocationSerializer < ActiveModel::Serializer
  attributes :id, :phone, :address, :address2, :city, :state, :postal, :to_short_string


  def to_short_string
    object.to_short_string
  end

end
