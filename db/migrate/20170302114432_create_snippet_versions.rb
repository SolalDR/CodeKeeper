class CreateSnippetVersions < ActiveRecord::Migration[5.0]
  def change
    create_table :snippet_versions do |t|
      t.text :content, null: false
      t.string :version, null: false, default:"1.0.0"
      t.string :doc
      t.string :comment
      t.timestamps
    end
  end
end
