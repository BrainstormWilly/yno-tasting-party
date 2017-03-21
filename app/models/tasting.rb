require "action_view"

class Tasting < ApplicationRecord
  include ActionView::Helpers::DateHelper
  belongs_to :host
  has_many :tasting_wines, dependent: :destroy
  has_many :guests, dependent: :destroy
  has_many :wine_reviews, dependent: :destroy
  has_many :tasters, through: :guests

  validates :name, length: { minimum: 1, maximum: 100 }, presence: true
  validates :open_at, presence: true
  validates :open_at, date: { after_or_equal_to: Proc.new { Time.current }, message: "Tastings can not be opened in the past."}, :if => lambda{ Rails.env.production? }

  def is_open?
    return false if self.closed_at? || self.completed_at?
    return false if Time.current < self.open_at
    return true if self.has_unrated_reviews?
    return true if self.close_at.nil?
    Time.current < self.close_at
  end

  def is_closed?
    return true if self.closed_at? || self.completed_at?
    return false if Time.current < self.open_at
    return false if self.has_unrated_reviews?
    return false if self.close_at.nil?
    Time.current >= self.close_at
  end

  def is_completed?
    return true if self.completed_at?
    return false if self.is_open?
    return false if Time.current < self.open_at
    if self.closed_at? && self.tasting_wines.where(wine_number: 0).count==0
      self.completed_at = Time.current
      self.save
      return true
    end
    false
  end

  def has_unrated_reviews?
    self.wine_reviews.each do |wr|
      if wr.unrated?
        return true
      end
    end
    false
  end

  def has_rated_reviews?
    self.wine_reviews.each do |wr|
      if !wr.unrated?
        return true
      end
    end
    false
  end

  # def has_unrevealed_wines?
  #   self.tasting_wines.where(wine_rating: 0).count > 0
  # end


  # def is_the_last_reveal?(tw)
  #   unrevealed = self.tasting_wines.where(wine_number: 0)
  #   return true if unrevealed.count == 0 && unrevealed.first == tw
  #   false
  # end

  def status
    # be careful of order here. is_completed? must come before is_closed?
    if self.is_open?
      return "Open"
    elsif self.is_completed?
      return "Completed"
    elsif self.is_closed?
      return "Closed"
    end
    "Opens in #{distance_of_time_in_words(Time.current, self.open_at)}"
  end

end
