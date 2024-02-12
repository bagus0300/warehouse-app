class CreateShippers < ActiveRecord::Migration[7.1]
  def change
    create_table :shippers do |t|
      t.string :name,             null: false, comment: '荷主名'
      t.string :code,             null: false, comment: '荷主コード'
      t.string :post_code,        null: false, comment: '郵便番号'
      t.string :main_address,     null: false, comment: '住所1'
      t.string :sub_address,      null: false, comment: '住所2'
      t.string :tel,              null: false, comment: '電話番号'
      t.datetime :closing_date,   null: false, comment: '締日'

      t.timestamps
    end

    add_index :shippers, :code,                unique: true
    add_index :shippers, :name,                unique: true
  end
end
