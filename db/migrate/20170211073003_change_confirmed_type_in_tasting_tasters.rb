class ChangeConfirmedTypeInTastingTasters < ActiveRecord::Migration[5.0]
  def change
    remove_column :tasting_tasters, :confirmed
    add_column :tasting_tasters, :confirmed, :datetime
  end
end
