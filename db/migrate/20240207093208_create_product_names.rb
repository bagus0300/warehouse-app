class CreateProductNames < ActiveRecord::Migration[7.1]
  def change
    create_table :product_names do |t|
      t.float :product_nameID
      t.float :product_number
      t.string :product_name
      t.string :product_packing
      t.float :unitPriceID

      t.timestamps
    end
  end
end
