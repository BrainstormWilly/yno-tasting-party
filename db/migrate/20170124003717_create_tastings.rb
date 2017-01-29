class CreateTastings < ActiveRecord::Migration[5.0]
  def change
    create_table :tastings do |t|
      t.string :name
      t.datetime :open_at
      t.datetime :close_at
      t.text :description
      t.boolean :private

      t.timestamps
    end
  end
end
