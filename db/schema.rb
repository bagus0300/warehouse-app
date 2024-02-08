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

ActiveRecord::Schema[7.1].define(version: 2024_02_07_093208) do
  create_table "product_names", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.float "product_nameID"
    t.float "product_number"
    t.string "product_name"
    t.string "product_packing"
    t.float "unitPriceID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

ActiveRecord::Schema[7.1].define(version: 2024_02_07_011953) do
  create_table "shipper_masters", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "shipper_name"
    t.string "post_code"
    t.string "address1"
    t.string "address2"
    t.string "telephone_number"
    t.string "closing_date"
    t.string "calc_category"
    t.float "used_tsubo_price"
    t.float "discount_rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "unit_prices", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "packing"
    t.float "handling_fee_unit"
    t.float "storage_fee_unit"
    t.string "billing_class"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_logs", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "login_id"
    t.string "login_ip"
    t.string "user_agent"
    t.string "login_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "user_name", default: "", null: false
    t.string "login_id", default: "", null: false, comment: "ログインID"
    t.integer "authority", default: 1, null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti"
    t.index ["login_id"], name: "index_users_on_login_id", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
