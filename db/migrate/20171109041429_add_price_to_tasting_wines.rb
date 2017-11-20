class AddPriceToTastingWines < ActiveRecord::Migration[5.0]
  def change
    add_column :tasting_wines, :price, :decimal, :precision => 10, :scale => 2
  end
end
