class AddClosedAtToTastings < ActiveRecord::Migration[5.0]
  def change
    add_column :tastings, :closed_at, :datetime
  end
end
