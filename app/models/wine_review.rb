class WineReview < ApplicationRecord
  belongs_to :tasting
  belongs_to :taster
  belongs_to :wine, optional: true

  validates :wine_number, presence: true, numericality: {greater_than_or_equal_to: 1}
  validates :tasting_id, presence: true
  validates :taster_id, presence: true
  validates :rating, presence: true, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 5}

  # def self.all_unrated
  #   reviews = WineReview.arel_table
  #   WineReview.where(reviews[:created_at].eq(reviews[:updated_at]))
  # end

  def unrated?
    self.created_at == self.updated_at
  end

  def self.tasting_has_reviews?(tasting_id)
    reviews = self.where(tasting_id: tasting_id)
    reviews.each do |r|
      return true if !r.unrated?
    end
    false
  end

  def self.max_wine_number_for_tasting(tasting_id)
    return 1 if self.where(tasting_id: tasting_id).count == 0
    self.where(tasting_id: tasting_id).order("wine_number DESC").first.wine_number
  end

  def self.create_next_in_sequence(tasting_id, taster_id)
    next_number = self.where(tasting_id: tasting_id, taster_id: taster_id).count + 1
    self.create({
      tasting_id: tasting_id,
      taster_id: taster_id,
      wine_number: next_number,
      rating: 3
    })
  end

  def self.delete_all_last_in_sequence(tasting_id)
    self.where(tasting_id: tasting_id).where(wine_number: self.max_wine_number_for_tasting).destroy_all
  end

  def self.create_all_for_taster(tasting_id, taster_id)
    (1..self.max_wine_number_for_tasting(tasting_id)).each do |n|
      WineReview.create({
        tasting_id: tasting_id,
        taster_id: taster_id,
        wine_number: n,
        rating: 3
      })
    end
  end

  def self.delete_all_for_taster(tasting_id, taster_id)
    WineReview.where(tasting_id: tasting_id).where(taster_id: taster_id).destroy_all
  end

end
