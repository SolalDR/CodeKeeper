class CreateSnippets < ActiveRecord::Migration[5.0]
  def change
    create_table :snippets do |t|
      t.string :description
      t.string :lang, null: false
      t.boolean :abstract, default: false
      #user
      t.timestamps
    end
  end
end
