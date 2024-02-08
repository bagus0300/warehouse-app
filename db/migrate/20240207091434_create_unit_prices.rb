class CreateUnitPrices < ActiveRecord::Migration[7.1]
  def change
    create_table :unit_prices do |t|
      t.string :packing
      t.float :handling_fee_unit
      t.float :storage_fee_unit
      t.string :billing_class

      t.timestamps
    end
  end
end
