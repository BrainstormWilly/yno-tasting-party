class CreateHosts < ActiveRecord::Migration[5.0]
  def change
    create_table :hosts do |t|
      t.references :taster, foreign_key: true
      t.string :phone

      t.timestamps
    end
  end
end
