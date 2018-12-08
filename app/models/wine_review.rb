class WineReview < ApplicationRecord
  belongs_to :tasting
  belongs_to :taster
  belongs_to :wine

  validates :wine_number, presence: true, numericality: {greater_than_or_equal_to: 1}
  validates :tasting_id, presence: true
  validates :taster_id, presence: true
  validates :rating, presence: true, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 5}

  # after_save :check_for_duplicate_wine_id

  default_scope { order(wine_number: :asc) }

  # def self.all_unrated
  #   reviews = WineReview.arel_table
  #   WineReview.where(reviews[:created_at].eq(reviews[:updated_at]))
  # end

  def unrated?
    created_at == updated_at
  end

  def average_rating
    wrs = self.class.where(tasting_id:self.tasting_id, wine_number:self.wine_number)
    (wrs.inject(0){ |sum, wr| sum + wr.rating }.to_f/wrs.count).round(1)
  end

  def taster_average_rating
    wrs = self.class.where(taster_id:self.taster_id, wine_id:self.wine_id)
    return self.rating if wrs.count==1
    (wrs.inject(0){ |sum, wr| sum + wr.rating }.to_f/wrs.count).round(1)
  end

  def taster_review_count
    wrs = self.class.where(wine_id:self.wine_id, taster_id:self.taster_id).count
  end


  def to_string
    str = "Wine #{self.wine_number}; Rating: #{self.rating}"
    if !self.comments.empty?
      str << "; Comments: #{self.comments}"
    end
    str
  end

  # def check_for_duplicate_wine_id
  #   if self.wine_id
  #     self.class
  #       .where(tasting_id:self.tasting_id)
  #       .where(wine_id:self.wine_id)
  #       .where.not(id:self.id)
  #       .update_all({wine_id:nil})
  #   end
  # end

  def self.tasting_has_reviews?(tasting)
    reviews = self.where(tasting_id: tasting.id)
    reviews.each do |r|
      return true if !r.unrated?
    end
    false
  end

  def self.next_wine_number_for_tasting(tasting)
    return 1 if self.where(tasting_id: tasting.id).count == 0
    self.where(tasting_id: tasting.id).order("wine_number DESC").first.wine_number + 1
  end

  # DEPRECATE
  def self.create_next_in_sequence_for_guest(tasting, taster)
    next_number = self.where(tasting_id: tasting.id, taster_id: taster.id).count + 1
    self.create({
      tasting_id: tasting.id,
      taster_id: taster.id,
      wine_number: next_number,
      rating: 3
    })
  end

  def self.delete_all_last_for_tasting(tasting)
    self.where(tasting_id: tasting.id).where(wine_number: self.maximum(:wine_number)).destroy_all
  end

  def self.create_all_for_guest(tasting, taster)
    (1..tasting.tasting_wines.count).each do |n|
      self.create({
        tasting_id: tasting.id,
        taster_id: taster.id,
        wine_number: n,
        rating: 3
      })
    end
  end

  def self.delete_all_for_guest(tasting, taster)
    self.where(tasting_id: tasting.id).where(taster_id: taster.id).destroy_all
  end

end
