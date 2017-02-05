class Tasting < ApplicationRecord
  belongs_to :host
  has_many :tasting_wines
  has_many :taster_tastings
  has_many :tasters, through: :taster_tastings
  has_many :wines, through: :tasting_wines

  validates :name, length: { minimum: 1, maximum: 100 }, presence: true
  validates :open_at, presence: true


end
