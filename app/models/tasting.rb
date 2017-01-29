class Tasting < ApplicationRecord

  has_many :tasters, through: :taster_tastings

  validates :name, length: { minimum: 1, maximum: 100 }, presence: true
  validates :open_at, presence: true


end
