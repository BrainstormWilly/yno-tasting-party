class AddWineNumberToWineReviews < ActiveRecord::Migration[5.0]
  def change
    add_column :wine_reviews, :wine_number, :integer
  end
end
