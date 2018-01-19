class Tastings::New::GuestSerializer < ActiveModel::Serializer
  attributes :id,
    :taster_id,
    :taster,
    :tasting_id,
    :tasting,
    :invited,
    :confirmed

  def taster
    Tastings::New::TasterSerializer.new(object.taster)
  end

  def tasting
    Tastings::New::TastingSerializer.new(object.tasting)
  end

end
