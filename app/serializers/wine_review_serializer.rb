class WineReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :wine_number, :created_at, :updated_at

  belongs_to :wine

end
