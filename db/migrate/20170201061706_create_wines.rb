class CreateWines < ActiveRecord::Migration[5.0]
  def change
    create_table :wines do |t|
      t.integer :vintage, default: 0
      t.string :name
      t.decimal :price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
