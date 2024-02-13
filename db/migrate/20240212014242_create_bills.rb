class CreateBills < ActiveRecord::Migration[7.1]
  def change
    create_table :bills do |t|
      t.bigint :shipper_id,               null:false, comment: '荷主id'
      t.bigint :warehouse_id,             null:false, comment: '倉庫id'
      t.date :billed_on,                  null:false, comment: '請求年月日'
      t.integer :closing_date,            null:false, comment: '締日'
      t.date :duration_from,              null:false, comment: '対象期間 From'
      t.date :duration_to,                null:false, comment: '対象期間 To'
      t.date :shipper_from,               null:false, comment: '対象荷主 From'
      t.date :shipper_to,                 null:false, comment: '対象荷主 To'
      t.integer :billed,                  limit: 1, null:false, comment: '請求したかどうか'
      t.integer :printed,                 limit: 1, null:false, comment: '請求書を作成したかどうか'

      t.timestamps
    end
  end
end
