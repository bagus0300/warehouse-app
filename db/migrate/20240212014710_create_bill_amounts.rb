class CreateBillAmounts < ActiveRecord::Migration[7.1]
  def change
    create_table :bill_amounts do |t|
      t.bigint :bill_id,                        null:false,  comment: '請求id'
      t.integer :last_amount,                   null:false,  comment: '前回請求額'
      t.integer :received_payment_amount,       null:false,  comment: '入金額'
      t.integer :handling_fee,                  null:false,  comment: '荷役料'
      t.integer :storage_fee,                   null:false,  comment: '保管料'
      t.integer :tax,                           null:false,  comment: '消費税'
      t.integer :current_amount,                null:false,  comment: '請求額'

      t.timestamps
    end
  end
end
