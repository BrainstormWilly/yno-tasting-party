class HostLocation < ApplicationRecord
  belongs_to :host
  belongs_to :location
end
