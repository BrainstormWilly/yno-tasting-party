class Alexa::WineReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :wine_number
end
