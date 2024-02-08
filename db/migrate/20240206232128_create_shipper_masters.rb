class CreateShipperMasters < ActiveRecord::Migration[7.1]
  def change
    create_table :shipper_masters do |t|
      t.string :shipper_name
      t.string :post_code
      t.string :address1
      t.string :address2
      t.string :telephone_number
      t.string :closing_date
      t.string :calc_category
      t.float :used_tsubo_price
      t.float :discount_rate

      t.timestamps
    end
  end
end
