class AddInfoToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :description, :text
    add_column :users, :nickname, :string
    add_column :users, :url_site, :string
    add_column :users, :url_github, :string
  end
end
