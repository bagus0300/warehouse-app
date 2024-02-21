class ProductSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :id, :name, :warehouse_fee, :stock

  def warehouse_fee
    {
      id:                   object.warehouse_fee.id,
      handling_fee_rate:    object.warehouse_fee.handling_fee_rate,
      storage_fee_rate:     object.warehouse_fee.storage_fee_rate,
      fee_category:         object.warehouse_fee.fee_category
    }
  end
  def stock
    {
      amount:  object.stock.amount
    }
  end
  
end
