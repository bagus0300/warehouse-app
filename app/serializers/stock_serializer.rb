class StockInoutSerializer
  include JSONAPI::Serializer
  
  attributes :stock_id, :amount, :inout_on, :handling_fee_rate, :lot_number, :stocks

  def stocks
    {
      warehouse_id:   object.stocks.warehouse_id,
      shipper_id:     object.stocks.shipper_id,
      product_id:     object.stocks.product_id,
      total_amount:   object.stocks.total_amount
    }
  end
end
