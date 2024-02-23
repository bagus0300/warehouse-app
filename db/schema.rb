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

ActiveRecord::Schema[7.1].define(version: 2024_02_12_014710) do
  create_table "authority_client_pages", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.integer "user_authority_id"
    t.integer "client_page_id"
    t.boolean "is_edit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_read"
  end

  create_table "bill_amounts", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "bill_id", null: false, comment: "請求id"
    t.integer "last_amount", null: false, comment: "前回請求額"
    t.integer "received_payment_amount", null: false, comment: "入金額"
    t.integer "handling_fee", null: false, comment: "荷役料"
    t.integer "storage_fee", null: false, comment: "保管料"
    t.integer "tax", null: false, comment: "消費税"
    t.integer "current_amount", null: false, comment: "請求額"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bills", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "shipper_id", null: false, comment: "荷主id"
    t.bigint "warehouse_id", null: false, comment: "倉庫id"
    t.date "billed_on", null: false, comment: "請求年月日"
    t.integer "closing_date", null: false, comment: "締日"
    t.date "duration_from", null: false, comment: "対象期間 From"
    t.date "duration_to", null: false, comment: "対象期間 To"
    t.date "shipper_from", null: false, comment: "対象荷主 From"
    t.date "shipper_to", null: false, comment: "対象荷主 To"
    t.integer "billed", null: false, comment: "請求したかどうか"
    t.integer "printed", null: false, comment: "請求書を作成したかどうか"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "client_pages", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.string "path"
    t.string "code_name"
    t.integer "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "品名"
    t.string "code", null: false, comment: "品名コード"
    t.bigint "warehouse_fee_id", null: false, comment: "単価 id"
    t.string "specification", null: false, comment: "規格・荷姿"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_products_on_code", unique: true
    t.index ["name"], name: "index_products_on_name", unique: true
    t.index ["specification"], name: "index_products_on_specification", unique: true
  end

  create_table "received_payments", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "shipper_id", null: false, comment: "荷主id"
    t.date "received_on", null: false, comment: "入金日"
    t.integer "amount", null: false, comment: "入金額"
    t.text "description", comment: "摘要"
    t.date "processing_on", comment: "処理日"
    t.integer "received", limit: 2, null: false, comment: "入金済みかどうか"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shippers", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "荷主名"
    t.string "code", null: false, comment: "荷主コード"
    t.string "post_code", null: false, comment: "郵便番号"
    t.string "main_address", null: false, comment: "住所1"
    t.string "sub_address", null: false, comment: "住所2"
    t.string "tel", null: false, comment: "電話番号"
    t.integer "closing_date", null: false, comment: "締日"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_shippers_on_code", unique: true
    t.index ["name"], name: "index_shippers_on_name", unique: true
  end

  create_table "stock_inouts", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "stock_id", null: false, comment: "在庫id"
    t.bigint "creator_id", null: false, comment: "登録ユーザーid"
    t.integer "category", null: false, comment: "登録ユーザーid"
    t.date "inout_on", null: false, comment: "入出庫日"
    t.integer "amount", null: false, comment: "入出庫数"
    t.integer "handling_fee_rate", null: false, comment: "荷役単価"
    t.integer "storage_fee_rate", null: false, comment: "保管単価"
    t.string "lot_number", null: false, comment: "ロット番号"
    t.string "weight", null: false, comment: "重量"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stocks", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "warehouse_id", null: false, comment: "倉庫id"
    t.bigint "shipper_id", null: false, comment: "荷主id"
    t.bigint "product_id", null: false, comment: "品名id"
    t.bigint "total_amount", null: false, comment: "在庫数"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_stocks_on_product_id"
    t.index ["shipper_id"], name: "index_stocks_on_shipper_id"
    t.index ["warehouse_id"], name: "index_stocks_on_warehouse_id"
  end

  create_table "user_authorities", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.integer "auth_num"
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

  create_table "warehouse_fees", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "code", null: false
    t.string "packaging", null: false
    t.integer "handling_fee_rate", null: false
    t.integer "storage_fee_rate", null: false
    t.integer "fee_category", limit: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_warehouse_fees_on_code", unique: true
  end

  create_table "warehouses", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "倉庫名"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_warehouses_on_name", unique: true
  end

end
