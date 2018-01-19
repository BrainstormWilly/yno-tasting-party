class Connection < ApplicationRecord
  belongs_to :host
  belongs_to :taster
end
