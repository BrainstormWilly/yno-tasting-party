class Guest < ApplicationRecord

  before_save :sequence_taster_number

  belongs_to :taster
  belongs_to :tasting
  # has_many :wine_reviews, through: :taster

  validates :taster_id, presence: true
  validates :tasting_id, presence: true

  # def self.has_invitations?(taster)
  #   tts = self.where(taster: taster)
  #   tts.each do |tt|
  #     if tt.invitation_open?
  #       return true
  #     end
  #   end
  #   false
  # end

  def invitation_open?
     self.invited != nil && self.confirmed == nil && !self.tasting.is_closed?
  end

  def tasting_confirmed?
    self.confirmed != nil
  end

  def reviews_left
    self.taster.wine_reviews.select{ |wr| wr.tasting==self.tasting && wr.unrated? }
  end



  private

  def sequence_taster_number
    number_assigned = true
    current_number = 0
    while number_assigned
      current_number += 1
      guests = self.class.where(taster_number: current_number).where(tasting: self.tasting)
      number_assigned = guests.count>0
    end
    self.taster_number = current_number
    current_number
  end

end
