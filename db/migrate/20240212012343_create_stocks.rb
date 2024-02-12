class CreateStocks < ActiveRecord::Migration[7.1]
  def change
    create_table :stocks do |t|
      t.bigint :warehouse_id,     null:false, comment: '倉庫id'
      t.bigint :shipper_id,       null:false, comment: '荷主id'
      t.bigint :product_id,       null:false, comment: '品名id'
      t.bigint :total_amount,     null:false, comment: '在庫数'

      t.timestamps
    end
    add_index :stocks, :warehouse_id,   unique: true
    add_index :stocks, :shipper_id,     unique: true
    add_index :stocks, :product_id,     unique: true
  end
end
