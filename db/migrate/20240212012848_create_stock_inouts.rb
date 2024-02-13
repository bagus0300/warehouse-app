class CreateStockInouts < ActiveRecord::Migration[7.1]
  def change
    create_table :stock_inouts do |t|
      t.bigint :stock_id,               null:false, comment: '在庫id'
      t.bigint :creator_id,             null:false, comment: '登録ユーザーid'
      t.integer :category,              null:false, comment: '登録ユーザーid'
      t.date :inout_on,                 null:false, comment: '入出庫日'             
      t.integer :amount,                null:false, comment: '入出庫数' 
      t.integer :handling_fee_rate,     null:false, comment: '荷役単価'
      t.integer :storage_fee_rate,      null:false, comment: '保管単価'
      t.string :lot_number,             null:false, comment: 'ロット番号'
      t.string :weight,                 null:false, comment: '重量'

      t.timestamps
    end
  end
end
