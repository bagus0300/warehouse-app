class WarehouseFeesController < ApplicationController
  protect_from_forgery 
  def index
    warehouse_fee = WarehouseFee.all
    
    render :json => {
      data: warehouse_fee,
      status: :accepted
    }
  end
  def create
    warehouse_fee = WarehouseFee.find_or_create_by(
        code:                 params[:code],
        packaging:              params[:packaging],
        handling_fee_rate:    params[:handling_fee_rate],
        storage_fee_rate:     params[:storage_fee_rate],
        fee_category:         params[:fee_category]
    )
    
    if warehouse_fee.save
      render :json => {
        data: warehouse_fee,
        status: :accepted
      }
    end
  end
  def update
    if WarehouseFee.where(id: params[:id]).update_all(
        code:                 params[:code],
        packaging:              params[:packaging],
        handling_fee_rate:    params[:handling_fee_rate],
        storage_fee_rate:     params[:storage_fee_rate],
        fee_category:         params[:fee_category]
      )

      render :json => {
        status: :accepted
      }
    end
  end
  def destroy
    warehouse_fee = WarehouseFee.find params[:id]
    
    if warehouse_fee.destroy
      render :json => {
        status: :accepted
      }
    end
  end
   private
  def request_params
    params.require(:warehouse_fee).permit(:code, :packaging, :handling_fee_rate, :storage_fee_rate, :fee_category)
  end
end
