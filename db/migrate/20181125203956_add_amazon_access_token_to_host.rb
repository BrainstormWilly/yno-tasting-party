class AddAmazonAccessTokenToHost < ActiveRecord::Migration[5.0]
  def change
    add_column :hosts, :amazon_access_token, :text
  end
end
