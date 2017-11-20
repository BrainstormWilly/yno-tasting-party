class Tastings::New::TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :description,
    :open_at,
    :close_at,
    :private,
    :location_id,
    :location,
    :host_id

  def location
    LocationSerializer.new(object.location)
  end


end
