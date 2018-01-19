class WineSerializer < ActiveModel::Serializer
  attributes :id, :name, :vintage, :full_name

  def full_name
    "#{object.vintage} #{object.name}"
  end

  def vintage
    object.vintage_name
  end

end
