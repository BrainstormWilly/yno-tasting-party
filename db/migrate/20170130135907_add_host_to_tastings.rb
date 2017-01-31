class AddHostToTastings < ActiveRecord::Migration[5.0]
  def change
    add_reference :tastings, :host, foreign_key: true
  end
end
