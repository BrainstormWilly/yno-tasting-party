class RenameTasterTastingsToTastingTasters < ActiveRecord::Migration[5.0]
  def change
    rename_table :taster_tastings, :tasting_tasters
  end
end
