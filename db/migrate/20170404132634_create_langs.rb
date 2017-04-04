class CreateLangs < ActiveRecord::Migration[5.0]
  def change
    create_table :langs do |t|
      t.string :cd, null: false, limit: 3
      t.string :cdMirror, default:"javascript"
      t.string :lib, null: false
      t.string :bgColor, null: false
      t.string :color, null: false, default: "#FFFFFF"
      t.timestamps
    end
  end
end
