class CreateShippers < ActiveRecord::Migration[7.1]
  def change
    create_table :shippers do |t|
      t.string :name
      t.string :identy_num
      t.string :post_code
      t.string :address1
      t.string :address2
      t.string :telephone_number
      t.datetime :closing_date
      t.string :calc_category
      t.float :used_tsubo_price
      t.float :discount_rate

      t.timestamps
    end
  end
end
