class ProductSerializer
  include JSONAPI::Serializer
  
  attributes :id, :name, :packing, :unit_price

  def unit_price
    {
      id:                   object.unit_price.id,
      handling_fee_unit:    object.unit_price.handling_fee_unit,
      storage_fee_unit:     object.unit_price.storage_fee_unit,
      billing_class:        object.unit_price.billing_class
    }
  end
end
