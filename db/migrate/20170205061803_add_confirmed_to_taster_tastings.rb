class AddConfirmedToTasterTastings < ActiveRecord::Migration[5.0]
  def change
    add_column :taster_tastings, :confirmed, :boolean
  end
end
