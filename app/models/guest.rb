class Guest < ApplicationRecord

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
     self.confirmed == nil && self.tasting.close_at > Time.current
  end

  def tasting_confirmed?
    self.confirmed != nil
  end

end
