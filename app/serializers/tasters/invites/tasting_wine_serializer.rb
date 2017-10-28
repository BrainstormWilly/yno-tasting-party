class Tasters::Invites::TastingWineSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :name, :vintage

  def vintage
    object.wine.vintage
  end

  def name
    object.wine.name
  end

  def full_name
    object.wine.full_name
  end

end
