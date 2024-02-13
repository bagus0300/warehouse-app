class CreateWarehouseFees < ActiveRecord::Migration[7.1]
  def change
    create_table :warehouse_fees do |t|
      t.string :code,                 null: false, comment: ''
      t.string :packaging,            null: false, comment: ''
      t.integer :handling_fee_rate,   null: false, comment: ''
      t.integer :storage_fee_rate,    null: false, comment: ''
      t.integer :fee_category,        null: false, comment: '', limit:1

      t.timestamps
    end
    add_index :warehouse_fees, :code, unique: true
  end
end
