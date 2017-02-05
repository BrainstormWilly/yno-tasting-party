class Wine < ApplicationRecord

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
