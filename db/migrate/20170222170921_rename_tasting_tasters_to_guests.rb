class RenameTastingTastersToGuests < ActiveRecord::Migration[5.0]
  def change
    rename_table :tasting_tasters, :guests
  end
end
