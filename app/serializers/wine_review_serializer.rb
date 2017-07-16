class WineReviewSerializer < ActiveModel::Serializer
  attributes :id, :taster_id, :rating, :comments, :wine_number, :created_at, :updated_at, :unrated

  belongs_to :wine

  def unrated
    object.unrated?
  end

end
