class AddLatitudeToLocation < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :latitude, :decimal, {precision: 10, scale: 6}
  end
end
