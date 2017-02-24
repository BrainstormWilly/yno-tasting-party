class Taster < ApplicationRecord
  belongs_to :user, dependent: :destroy
  has_many :guests
  has_many :wine_reviews

end
