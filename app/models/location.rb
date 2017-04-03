class Location < ApplicationRecord

  has_many :host_locations

  def to_short_string
    "#{self.phone} | #{self.address}, #{self.city} #{self.state} #{self.postal}"
  end

end
