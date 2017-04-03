class Wine < ApplicationRecord

  default_scope { order(created_at: :desc) }

  has_many :tasting_wines

  validates :name, length: { minimum: 6, maximum: 100 }, presence: true
  validates :price, presence: true

  def full_name
    "#{self.vintage_name} #{self.name}"
  end

  def vintage_name
    return "NV" if self.vintage == 0
    vintage
  end

end
