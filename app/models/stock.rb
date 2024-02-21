class Stock < ApplicationRecord
  has_many :stock_inout
  belongs_to :product

  scope :filtered, ->(wharehouse_id, shipper_id) {
    joins(:product)
      .where(warehouse_id: wharehouse_id, shipper_id: shipper_id)
      .select('products.name AS product_name, stocks.id, products.id AS product_id')
  }
end
