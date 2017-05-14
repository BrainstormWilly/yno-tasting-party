class AddTasterNumberToGuest < ActiveRecord::Migration[5.0]
  def change
    add_column :guests, :taster_number, :integer
  end
end
