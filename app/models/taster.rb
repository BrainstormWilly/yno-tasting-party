class Taster < ApplicationRecord
  belongs_to :user, dependent: :destroy
  has_many :guests
  has_many :wine_reviews

  enum status: [:pending, :active, :inactive]

  before_save :default_status

  private

    def default_status
      self.status ||= :pending
    end

end
