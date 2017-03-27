class Host < ApplicationRecord

  belongs_to :taster
  has_many :tastings
  has_many :host_locations

  validates :phone, length: { minimum: 10, maximum: 100 }, presence: true

  def primary_location
    self.host_locations.where(primary: true).first.location
  end
end
