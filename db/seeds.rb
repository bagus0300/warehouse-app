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

ClientPage.create!([
  {
    name: 'TOP',
    path: '/top',
    code_name: 'top',
  },{
    name: '入庫処理',
    path: '/in_process',
    code_name: 'in_process',
  },{
    name: '出庫処理',
    path: '/out_process',
    code_name: 'out_process',
  },{
    name: '在庫管理',
    path: '/stock_process',
    code_name: 'stock_process',
  },{
    name: '入金処理',
    path: '/in_billing',
    code_name: 'in_billing',
  },{
    name: '請求処理',
    path: '/top',
    code_name: 'top',
  },{
    name: '品名一覧',
    path: '/product',
    code_name: 'product',
  },{
    name: '荷主マスタ',
    path: '/shipper',
    code_name: 'shipper',
  },{
    name: '単価区分マスタ',
    path: '/unit_price',
    code_name: 'unit_price',
  },
])

UserAuthority.create([{
  name: '入出庫の入力・編集のみ',
  auth_num: 1,
},{
  name: '1＋請求書発行（締日処理）',
  auth_num: 2,
},{
  name: '2 + マスタ管理機能',
  auth_num: 9,
},{
  name: 'admin',
  auth_num: 7,
}])