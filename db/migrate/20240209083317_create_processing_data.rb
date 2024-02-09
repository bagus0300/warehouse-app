class CreateProcessingData < ActiveRecord::Migration[7.1]
  def change
    create_table :processing_data do |t|
      t.integer :processing_type, null: false, default: 0, comment: "0->入庫, 1->出庫"
      t.datetime :processing_date, null: false, default: Time.current, comment: "入出庫日"
      t.references :warehouse, null: false, foreign_key: true
      t.integer :processing_no, null: false, default: nil
      t.integer :lot_num, null: false, default: nil
      t.decimal :weight, null: false, precision: 6, scale: 2, default: 0.0
      t.string :processing_num, null: false, default: ""
      t.decimal :unit_price, null: false, precision: 6, scale: 2, default: 0.0
      t.references :reg_user, null: false, foreign_key: {to_table: :users}
      t.references :update_user, foreign_key: {to_table: :users}
      t.integer :is_canceled, null: false, default: 0, comment: "1->キャンセル"
      t.timestamps
    end
  end
end
