class CreateHostLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :host_locations do |t|
      t.references :host, foreign_key: true
      t.references :location, foreign_key: true
      t.boolean :primary, default: true

      t.timestamps
    end
  end
end
