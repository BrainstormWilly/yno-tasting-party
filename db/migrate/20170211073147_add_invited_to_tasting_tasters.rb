class AddInvitedToTastingTasters < ActiveRecord::Migration[5.0]
  def change
    add_column :tasting_tasters, :invited, :datetime
  end
end
