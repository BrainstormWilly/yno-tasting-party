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

ActiveRecord::Schema.define(version: 20170321051050) do

  create_table "admins", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_admins_on_user_id"
  end

  create_table "guests", force: :cascade do |t|
    t.integer  "tasting_id"
    t.integer  "taster_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "confirmed"
    t.datetime "invited"
  end

  create_table "host_locations", force: :cascade do |t|
    t.integer  "host_id"
    t.integer  "location_id"
    t.boolean  "primary",     default: true
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["host_id"], name: "index_host_locations_on_host_id"
    t.index ["location_id"], name: "index_host_locations_on_location_id"
  end

  create_table "hosts", force: :cascade do |t|
    t.integer  "taster_id"
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["taster_id"], name: "index_hosts_on_taster_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string   "phone"
    t.string   "address"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "postal"
    t.string   "country",    default: "US"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "tasters", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "handle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tasters_on_user_id"
  end

  create_table "tasting_wines", force: :cascade do |t|
    t.integer  "tasting_id"
    t.integer  "wine_id"
    t.integer  "wine_number", default: 0
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["tasting_id"], name: "index_tasting_wines_on_tasting_id"
    t.index ["wine_id"], name: "index_tasting_wines_on_wine_id"
  end

  create_table "tastings", force: :cascade do |t|
    t.string   "name"
    t.datetime "open_at"
    t.datetime "close_at"
    t.text     "description"
    t.boolean  "private"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "host_id"
    t.datetime "closed_at"
    t.datetime "completed_at"
    t.index ["host_id"], name: "index_tastings_on_host_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.string   "invited_by_type"
    t.integer  "invited_by_id"
    t.integer  "invitations_count",      default: 0
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invitations_count"], name: "index_users_on_invitations_count"
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "wine_reviews", force: :cascade do |t|
    t.integer  "tasting_id"
    t.integer  "taster_id"
    t.integer  "wine_id"
    t.integer  "rating"
    t.text     "comments"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "wine_number"
    t.index ["taster_id"], name: "index_wine_reviews_on_taster_id"
    t.index ["tasting_id"], name: "index_wine_reviews_on_tasting_id"
    t.index ["wine_id"], name: "index_wine_reviews_on_wine_id"
  end

  create_table "wines", force: :cascade do |t|
    t.integer  "vintage",                             default: 0
    t.string   "name"
    t.decimal  "price",      precision: 10, scale: 2
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

end
