class ChangeConfirmedTypeInTastingTasters < ActiveRecord::Migration[5.0]
  def change
    change_column :tasting_tasters, :confirmed, "datetime USING confirmed::timestamp without time zone"
  end
end
