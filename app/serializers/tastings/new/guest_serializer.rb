class Tastings::New::GuestSerializer < ActiveModel::Serializer
  attributes :id,
    :taster_id,
    :taster,
    :tasting_id

  def taster
    Tastings::New::TasterSerializer.new(object.taster)
  end

end
