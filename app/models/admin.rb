class Admin < ApplicationRecord
  belongs_to :user

  validates :name, length: { minimum: 1, maximum: 100 }, presence: true
end
