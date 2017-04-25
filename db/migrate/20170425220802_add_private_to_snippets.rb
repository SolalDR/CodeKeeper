class AddPrivateToSnippets < ActiveRecord::Migration[5.0]
  def change
    add_column :snippets, :private, :boolean, default: false
  end
end
