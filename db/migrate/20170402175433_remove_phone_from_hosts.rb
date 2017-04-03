class RemovePhoneFromHosts < ActiveRecord::Migration[5.0]
  def change
    remove_column :hosts, :phone
  end
end
