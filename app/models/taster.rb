class Taster < ApplicationRecord
  belongs_to :user
  has_many :tastings, through: :taster_tastings

  validates :name, length: { minimum: 1, maximum: 100 }, presence: true

end
