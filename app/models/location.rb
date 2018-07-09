class Location < ApplicationRecord

  has_many :host_locations

  # Geocoder requirements
  # populates longitude & latitude attributes
  geocoded_by :geo_address
  after_validation :geocode

  # e.g. America/Los_Angeles
  # is used for invite Mailers
  # longitude/latitude must be set first
  before_save :set_time_zone


  def geo_address
    [self.address, self.city, self.state, self.country].compact.join(", ")
  end

  def to_short_string
    "#{self.phone} | #{self.address}, #{self.city} #{self.state} #{self.postal}"
  end


  private

  def set_time_zone
    self.time_zone = Timezone.lookup(self.latitude, self.longitude).name rescue "UTC"
  end



end
