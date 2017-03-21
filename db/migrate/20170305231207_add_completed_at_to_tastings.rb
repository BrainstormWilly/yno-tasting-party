class AddCompletedAtToTastings < ActiveRecord::Migration[5.0]
  def change
    add_column :tastings, :completed_at, :datetime, null: true
  end
end
