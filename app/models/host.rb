class Host < ApplicationRecord
  belongs_to :taster

  validates :phone, length: { minimum: 10, maximum: 100 }, presence: true
end
