class ReceivedPaymentsController < ApplicationController
  # protect_from_forgery 
  def index
    keyword = params[:keyword]
    offset = params[:offset]
    limit = params[:limit]
    
    instock_from_date = params[:instockFromDate]
    instock_to_date = params[:instockToDate]
    
    process_from_date = params[:processFromDate]
    process_to_date = params[:processToDate]

    shipper = params[:shipper]

    received_payments = ReceivedPayment.includes(:shipper)
    count = received_payments.count

    if instock_from_date.present?
      instock_from_date = Time.parse(instock_from_date)
      received_payments.where('received_on > ?', instock_from_date)
    end
    if instock_to_date.present?
      instock_to_date = Time.parse(instock_to_date)
      received_payments.where('received_on < ?', instock_to_date )
  
    end
    if process_from_date.present?
      process_from_date = Time.parse(process_from_date)
      received_payments.where('process_on > ?', process_from_date)
    
    end
    if process_to_date.present?
      process_to_date = Time.parse(process_to_date)
      received_payments.where('process_on < ?',process_to_date)
    end

    if shipper.present?
      received_payments.where('shipper_id < ?', shipper)
    end

    received_payments = received_payments.offset(offset).limit(limit)
   
    render :json => {
      data: ReceivedPaymentSerializer.new(received_payments).as_json,
      count: count
    } 
      # data: receivedPayments,
  end
  def create
    receivedPayment = ReceivedPayment.create(
      shipper_id:       params[:shipper_id],
      received_on:      params[:received_on],
      amount:           params[:amount],
      description:      params[:description],
      processing_on:    params[:processing_on],
      received:         0
    )

    if receivedPayment.save
      render json:  :accepted
    end
  end
  def update
    if ReceivedPayment.where(id: params[:id]).update_all(
      shipper_id:       params[:shipper_id],
      received_on:      params[:received_on],
      amount:           params[:amount],
      description:      params[:description],
      processing_on:    params[:processing_on],
      received:         1
      )

      render json:  :accepted
    end
  end
  def destroy
    puts "====================="
    ReceivedPayment.destroy(params[:id])
    
    render json:  :accepted
  end
end
