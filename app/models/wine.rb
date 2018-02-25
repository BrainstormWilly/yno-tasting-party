class Wine < ApplicationRecord

  default_scope { order(created_at: :desc) }

  has_many :tasting_wines
  has_many :wine_reviews

  validates :name, length: { minimum: 6, maximum: 100 }, presence: true

  def average_rating
    return 0 if self.wine_reviews.count==0
    (self.wine_reviews.inject(0){ |sum, wr| sum + wr.rating }.to_f/self.wine_reviews.count).round(1)
  end

  def full_name
    "#{self.vintage_name} #{self.name}"
  end

  def vintage_name
    return "NV" if self.vintage == 0
    vintage
  end

end
