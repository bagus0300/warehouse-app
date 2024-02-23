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
    name: 'トップ',
    path: '/home',
    code_name: 'home',
  },{
    name: '入庫処理',
    path: '/stock_in',
    code_name: 'stock_in',
  },{
    name: '出庫処理',
    path: '/stock_out',
    code_name: 'stock_out',
  },{
    name: '在庫管理',
    path: '/stock',
    code_name: 'stock',
  },{
    name: '入金処理',
    path: '/deposit',
    code_name: 'deposit',
  },{
    name: '請求一覧',
    path: '/bill_list',
    code_name: 'bill_list',
  },{
    name: '請求処理',
    path: '/bill_process',
    code_name: 'bill_process',
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
    path: '/warehouse_fee',
    code_name: 'warehouse_fee',
  },
  {
    name: '権限別ペジ管理',
    path: '/auth_permission',
    code_name: 'auth_permission',
  },
  {
    name: 'user管理',
    path: '/user_managent',
    code_name: 'user_managent',
  },
])

UserAuthority.create([{
  id: 1,
  name: '入出庫の入力・編集のみ',
  auth_num: 1,
},{
  id: 2,
  name: '1＋請求書発行（締日処理）',
  auth_num: 2,
},{
  id: 7,
  name: 'admin',
  auth_num: 7,
},{
  id: 9,
  name: '2 + マスタ管理機能',
  auth_num: 9,
}])

WarehouseFee.create([
  {
    code: '22',
    packaging: 'C/Ｎ　10Kg以上',
    handling_fee_rate: '11',
    storage_fee_rate: '16',
    fee_category: 1,
  },
  {
    code: '1',
    packaging: 'C/N　10Kg以下',
    handling_fee_rate: '8',
    storage_fee_rate: '11',
    fee_category: 1,
  },
  {
    code: '2',
    packaging: 'C/S	',
    handling_fee_rate: '10',
    storage_fee_rate: '11',
    fee_category: 1,
  },
  {
    code: '3',
    packaging: 'C/S  加工油',
    handling_fee_rate: '11',
    storage_fee_rate: '16',
    fee_category: 1,
  },
  {
    code: '4',
    packaging: 'B/G	',
    handling_fee_rate: '12',
    storage_fee_rate: '15',
    fee_category: 1,
  },
  {
    code: '5',
    packaging: 'D/M	',
    handling_fee_rate: '110',
    storage_fee_rate: '180',
    fee_category: 1,
  },
  {
    code: '6',
    packaging: 'F/D	',
    handling_fee_rate: '50',
    storage_fee_rate: '100',
    fee_category: 1,
  },
  {
    code: '7',
    packaging: 'F/C  一般',
    handling_fee_rate: '205',
    storage_fee_rate: '305',
    fee_category: 1,
  },
  {
    code: '8',
    packaging: 'F/C　保冷品',
    handling_fee_rate: '205',
    storage_fee_rate: '305',
    fee_category: 1,
  },
  {
    code: '9',
    packaging: 'CNT  液',
    handling_fee_rate: '480',
    storage_fee_rate: '880',
    fee_category: 1,
  },
  {
    code: '10',
    packaging: 'C/S',
    handling_fee_rate: '5',
    storage_fee_rate: '12',
    fee_category: 2,
  },
  {
    code: '11',
    packaging: 'C/S',
    handling_fee_rate: '5',
    storage_fee_rate: '12',
    fee_category: 2,
  },
  {
    code: '12',
    packaging: 'ポリカン',
    handling_fee_rate: '5',
    storage_fee_rate: '12',
    fee_category: 2,
  },
  {
    code: '13',
    packaging: 'ビン(1.8ﾘｯﾄﾙ)',
    handling_fee_rate: '5',
    storage_fee_rate: '12',
    fee_category: 2,
  },
  {
    code: '14',
    packaging: 'F/C',
    handling_fee_rate: '320',
    storage_fee_rate: '300',
    fee_category: 1,
  },
  {
    code: '15',
    packaging: 'B/G',
    handling_fee_rate: '7',
    storage_fee_rate: '7',
    fee_category: 1,
  },
  {
    code: '16',
    packaging: '空F/D',
    handling_fee_rate: '20',
    storage_fee_rate: '90',
    fee_category: 1,
  },
  {
    code: '17',
    packaging: '空Ｆ/Ｄ',
    handling_fee_rate: '20',
    storage_fee_rate: '90',
    fee_category: 1,
  },
  {
    code: '18',
    packaging: 'B/G',
    handling_fee_rate: '12',
    storage_fee_rate: '15',
    fee_category: 1,
  },
  {
    code: '19',
    packaging: 'FD/M',
    handling_fee_rate: '50',
    storage_fee_rate: '100',
    fee_category: 1,
  },
  {
    code: '20',
    packaging: '袋',
    handling_fee_rate: '5',
    storage_fee_rate: '5',
    fee_category: 1,
  },
  {
    code: '21',
    packaging: 'P/T',
    handling_fee_rate: '500',
    storage_fee_rate: '700',
    fee_category: 1,
  },
])

Warehouse.create([{
  name: '一般倉庫'
},{
  name: '恒温倉庫'
},{
  name: '危険物倉庫'
}])

User.create([{
  user_name: 'systemadmin',
  login_id: 'systemadmin',
  authority: 7,
  email: 'sample@test.com',
  password: 'systemadmin'
}])


AuthorityClientPage.create([{
  user_authority_id: 7,
  client_page_id: 1,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 2,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 3,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 4,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 5,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 6,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 7,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 8,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 9,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 10,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 11,
  is_read: 1,
  is_edit: 1
},{
  user_authority_id: 7,
  client_page_id: 12,
  is_read: 1,
  is_edit: 1
},])