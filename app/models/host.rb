class Host < ApplicationRecord
  belongs_to :taster
  has_many :tastings
  has_many :host_locations
  has_many :connections

  def primary_location
    self.host_locations.where(primary: true).first.location
  end
end
