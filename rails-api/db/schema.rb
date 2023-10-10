# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_10_10_042710) do
  create_table "finalResults", primary_key: ["rank", "name"], force: :cascade do |t|
    t.integer "rank"
    t.text "name"
    t.float "totalscore"
    t.integer "numoflists"
    t.integer "avglistyear"
  end

  create_table "game_metadata", primary_key: "name", id: :text, force: :cascade do |t|
    t.text "releasedate"
    t.text "platforms"
    t.text "developers"
    t.text "genre"
  end

  create_table "goat", primary_key: ["filename", "listyear", "publication", "rank", "name", "weightedpoints"], force: :cascade do |t|
    t.text "filename"
    t.text "listyear"
    t.text "publication"
    t.text "listtype"
    t.integer "rank"
    t.text "name"
    t.decimal "weightedpoints"
    t.boolean "isranked"
    t.text "notes"
  end

  add_foreign_key "finalResults", "game_metadata", column: "name", primary_key: "name"
  add_foreign_key "goat", "game_metadata", column: "name", primary_key: "name"
end
