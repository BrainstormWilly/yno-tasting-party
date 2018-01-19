class CreateConnections < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.references :host, foreign_key: true
      t.references :taster, foreign_key: true
      t.datetime :connected_at

      t.timestamps
    end
  end
end
