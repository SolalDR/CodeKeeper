class AddUserAssociationToSnippets < ActiveRecord::Migration[5.0]
  def change
    add_column :snippets, :user_id, :integer, index: true
  end
end
