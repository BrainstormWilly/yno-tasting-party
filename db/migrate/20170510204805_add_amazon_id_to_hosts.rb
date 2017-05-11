class AddAmazonIdToHosts < ActiveRecord::Migration[5.0]
  def change
    add_column :hosts, :amazon_id, :string
  end
end
