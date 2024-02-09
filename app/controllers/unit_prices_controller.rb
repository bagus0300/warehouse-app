class UnitPricesController < ApplicationController
  
  def index
    unit_price = UnitPrice.all
    
    render :json => {
      data: unit_price,
      status: :accepted
    }
  end
  def create
    unit_price = UnitPrice.find_or_create_by(
      packing:              params[:packing],
      handling_fee_unit:    params[:handling_fee_unit],
      storage_fee_unit:     params[:storage_fee_unit],
      billing_class:        params[:billing_class]
    )
    
    if unit_price.save
      render :json => {
        data: unit_price,
        status: :accepted
      }
    end
  end
  def update
    if UnitPrice.where(id: params[:id]).update_all(
        packing:              params[:packing],
        handling_fee_unit:    params[:handling_fee_unit],
        storage_fee_unit:     params[:storage_fee_unit],
        billing_class:        params[:billing_class]
      )

      render :json => {
        status: :accepted
      }
    end
  end
  def destroy
    unit_price = UnitPrice.find params[:id]
    
    if unit_price.destroy
      render :json => {
        status: :accepted
      }
    end
  end
end
