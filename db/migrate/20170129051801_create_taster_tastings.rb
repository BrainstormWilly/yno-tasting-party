class CreateTasterTastings < ActiveRecord::Migration[5.0]
  def change
    create_table :taster_tastings do |t|
      t.integer :tasting_id
      t.integer :taster_id
      t.timestamps
    end
  end
end
