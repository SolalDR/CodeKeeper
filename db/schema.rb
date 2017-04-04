# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170404150702) do

  create_table "langs", force: :cascade do |t|
    t.string   "cd",         limit: 3,                        null: false
    t.string   "cdMirror",             default: "javascript"
    t.string   "lib",                                         null: false
    t.string   "bgColor",                                     null: false
    t.string   "color",                default: "#FFFFFF",    null: false
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
  end

  create_table "snippet_versions", force: :cascade do |t|
    t.text     "content",                      null: false
    t.string   "version",    default: "1.0.0", null: false
    t.string   "doc"
    t.string   "comment"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "snippet_id"
    t.index ["snippet_id"], name: "index_snippet_versions_on_snippet_id"
  end

  create_table "snippets", force: :cascade do |t|
    t.string   "description"
    t.boolean  "abstract",    default: false
    t.string   "name",                        null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "lang_id"
    t.index ["lang_id"], name: "index_snippets_on_lang_id"
  end

end
