class WineSerializer < ActiveModel::Serializer
  attributes :id, :name, :vintage, :full_name

  def full_name
    "#{object.vintage} #{object.name}"
  end

end
