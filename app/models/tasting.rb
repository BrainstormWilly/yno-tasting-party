class Tasting < ApplicationRecord
  belongs_to :host
  has_many :tasting_wines, dependent: :destroy
  has_many :guests, dependent: :destroy
  has_many :wine_reviews, dependent: :destroy
  has_many :tasters, through: :guests

  validates :name, length: { minimum: 1, maximum: 100 }, presence: true
  validates :open_at, presence: true
  validates :open_at, date: { after_or_equal_to: Proc.new { Time.current }, message: "Tastings can not be created in the past."}, :if => lambda{ Rails.env.production? }

  def is_open?
    return false if self.closed_at
    return false if Time.current < self.open_at
    return true if self.has_unrated_reviews?
    return true if self.close_at.nil?
    Time.current < self.close_at
  end

  def is_closed?
    return true if self.closed_at
    return false if Time.current < self.open_at
    return false if self.has_unrated_reviews?
    return false if self.close_at.nil?
    Time.current >= self.close_at
  end

   def has_unrated_reviews?
     self.wine_reviews.each do |wr|
       if wr.unrated?
         return true
       end
     end
     false
   end

end
