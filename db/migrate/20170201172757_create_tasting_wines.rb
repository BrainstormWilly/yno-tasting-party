class CreateTastingWines < ActiveRecord::Migration[5.0]
  def change
    create_table :tasting_wines do |t|
      t.references :tasting, foreign_key: true
      t.references :wine, foreign_key: true
      t.integer :wine_number, default: 0

      t.timestamps
    end
  end
end
