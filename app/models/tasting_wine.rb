class TastingWine < ApplicationRecord
  belongs_to :tasting
  belongs_to :wine

  after_save :check_for_duplicate_wine_number

  # def self.all_revealed?
  #   where(wine_number: 0).count == 0
  # end

  def is_last_reveal?
    unrevealed = self.class.where(wine_number: 0, tasting: self.tasting)
    return true if unrevealed.count == 1 and unrevealed.first == self
    false
  end

  private

    def check_for_duplicate_wine_number
      if self.wine_number != 0
        dupes = self.class.where(tasting: self.tasting).where(wine_number: self.wine_number).where.not(id:self.id)
        dupes.update_all(wine_number: 0)
      end
    end
end
