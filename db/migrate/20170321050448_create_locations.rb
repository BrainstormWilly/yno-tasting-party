class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :phone
      t.string :address
      t.string :address2
      t.string :city
      t.string :state
      t.string :postal
      t.string :country, default: "US"

      t.timestamps
    end
  end
end
