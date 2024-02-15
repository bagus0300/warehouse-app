class ReceivedPaymentsController < ApplicationController
  # protect_from_forgery 
  def index
    
    receivedPayments = ReceivedPayment.all

    render :json => {
      data: receivedPayments,
      status: :accepted
    }
  end
  def create
    receivedPayment = ReceivedPayment.create(
      shipper_id:       params[:shipper_id],
      received_on:      params[:received_on],
      amount:           params[:amount],
      description:      params[:description],
      processing_on:    params[:processing_on],
      received:         params[:received]
    )

    if receivedPayment.save
      render :json => {
        status: :accepted
      }
    end
  end
  def update
    # if ReceivedPayment.where(id: params[:id]).update_all
    # receivedPayment = ReceivedPayment.find params[:id]
    # receivedPayment.update_all

    if ReceivedPayment.where(id: params[:id]).update_all(
      shipper_id:       params[:shipper_id],
      received_on:      params[:received_on],
      amount:           params[:amount],
      description:      params[:description],
      processing_on:    params[:processing_on],
      received:         params[:received]
      )
      render :json => {
        status: :accepted
      }
    end
  end
  def destroy
    ReceivedPayment.destroy(params[:id])
    
    render :json => {
      status: :accepted
    }
  end
end
