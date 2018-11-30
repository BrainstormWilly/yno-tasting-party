class Taster < ApplicationRecord
  belongs_to :user, dependent: :destroy
  has_one :host
  has_many :guests
  has_many :wine_reviews
  has_many :connections

  enum status: [:pending, :active, :inactive]

  before_save :default_status


  def invites
    self.guests.select{ |g| g.invitation_open? }
  end

  private

  def default_status
    self.status ||= :active
  end


end
