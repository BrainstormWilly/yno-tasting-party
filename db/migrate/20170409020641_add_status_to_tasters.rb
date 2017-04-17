class AddStatusToTasters < ActiveRecord::Migration[5.0]
  def change
    add_column :tasters, :status, :integer
  end
end
