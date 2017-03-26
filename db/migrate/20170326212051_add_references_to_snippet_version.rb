class AddReferencesToSnippetVersion < ActiveRecord::Migration[5.0]
  def change
    add_reference :snippet_versions, :snippet, foreign_key: true
  end
end
