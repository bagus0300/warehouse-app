class CreateReceivedPayments < ActiveRecord::Migration[7.1]
  def change
    create_table :received_payments do |t|
      t.bigint :shipper_id,             null:false, comment: '荷主id'
      t.date :received_on,              null:false, comment: '入金日'
      t.integer :amount,                null:false, comment: '入金額'
      t.text :description,              comment: '摘要'
      t.date :processing_on,            comment: '処理日'
      t.integer :received,              limit:1, null:false, comment: '入金済みかどうか'

      t.timestamps
    end
  end
end
