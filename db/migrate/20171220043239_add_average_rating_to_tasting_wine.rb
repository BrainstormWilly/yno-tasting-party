class AddAverageRatingToTastingWine < ActiveRecord::Migration[5.0]
  def change
    add_column :tasting_wines, :average_rating, :decimal, precision: 4, scale: 1
  end
end
