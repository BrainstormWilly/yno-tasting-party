class AddLocationToTasting < ActiveRecord::Migration[5.0]
  def change
    add_reference :tastings, :location, foreign_key: true
  end
end
