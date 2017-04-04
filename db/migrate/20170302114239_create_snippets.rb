class CreateSnippets < ActiveRecord::Migration[5.0]
  def change
    create_table :snippets do |t|
      t.string :description
      t.boolean :abstract, default: false
      t.string :name, null: false
      # type : Style / Méthode / Fonction / Prototype
      #user
      t.timestamps
    end
  end
end
