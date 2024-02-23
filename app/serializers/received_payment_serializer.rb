class ReceivedPaymentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :shipper_id, :received_on, :amount, :description, :processing_on, :received, :shipper

  def shipper
    {
      id:       object.shipper.id,
      name:     object.shipper.name,
      code:     object.shipper.code
    }
  end
end
