class TasterTasting < ApplicationRecord

  belongs_to :taster
  belongs_to :tasting

  validates :taster_id, presence: true
  validates :tasting_id, presence: true

end
