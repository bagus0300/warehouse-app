class CreateWarehouses < ActiveRecord::Migration[7.1]
  def change
    create_table :warehouses do |t|
      t.string :name,   null: false, comment: '倉庫名'

      t.timestamps
    end
    add_index :warehouses, :name,                unique: true
  end
end
