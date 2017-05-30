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

ActiveRecord::Schema.define(version: 20170529205752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ckeditor_assets", force: :cascade do |t|
    t.string   "data_file_name",               null: false
    t.string   "data_content_type"
    t.integer  "data_file_size"
    t.string   "data_fingerprint"
    t.string   "type",              limit: 30
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["type"], name: "index_ckeditor_assets_on_type", using: :btree
  end

  create_table "langs", force: :cascade do |t|
    t.text     "cd",                                null: false
    t.string   "cdMirror",   default: "javascript"
    t.string   "lib",                               null: false
    t.string   "bgColor",                           null: false
    t.string   "color",      default: "#FFFFFF",    null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  create_table "likes", force: :cascade do |t|
    t.string   "likable_type"
    t.integer  "likable_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "user_id"
    t.index ["likable_type", "likable_id"], name: "index_likes_on_likable_type_and_likable_id", using: :btree
    t.index ["user_id"], name: "index_likes_on_user_id", using: :btree
  end

  create_table "snippet_versions", force: :cascade do |t|
    t.text     "content",                      null: false
    t.string   "version",    default: "1.0.0", null: false
    t.string   "doc"
    t.string   "comment"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "snippet_id"
    t.index ["snippet_id"], name: "index_snippet_versions_on_snippet_id", using: :btree
  end

  create_table "snippets", force: :cascade do |t|
    t.string   "description"
    t.boolean  "abstract",    default: false
    t.string   "name",                        null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "lang_id"
    t.integer  "user_id"
    t.boolean  "private",     default: false
    t.index ["lang_id"], name: "index_snippets_on_lang_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "firstname"
    t.string   "lastname"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.boolean  "admin",                  default: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "provider"
    t.string   "uid"
    t.text     "description"
    t.string   "nickname"
    t.string   "url_site"
    t.string   "url_github"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "likes", "users"
  add_foreign_key "snippet_versions", "snippets"
  add_foreign_key "snippets", "langs"
end
