class RemovePriceFromWines < ActiveRecord::Migration[5.0]
  def change
    remove_column :wines, :price
  end
end
