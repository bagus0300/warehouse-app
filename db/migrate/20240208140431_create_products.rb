class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :number
      t.string :packing
      t.string :unit_price_id

      t.timestamps
    end
  end
end
