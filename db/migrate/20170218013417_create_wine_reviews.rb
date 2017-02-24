class CreateWineReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :wine_reviews do |t|
      t.references :tasting, foreign_key: true
      t.references :taster, foreign_key: true
      t.references :wine, foreign_key: true
      t.integer :rating, default: 3
      t.text :comments

      t.timestamps
    end
  end
end
