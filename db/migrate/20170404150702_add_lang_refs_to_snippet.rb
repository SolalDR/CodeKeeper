class AddLangRefsToSnippet < ActiveRecord::Migration[5.0]
  def change
    add_reference :snippets, :lang, foreign_key: true
  end
end
