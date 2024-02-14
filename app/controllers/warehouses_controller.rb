class WarehousesController < ApplicationController
  protect_from_forgery 
  def index
    warehouse = Warehouse.all
    render :json => {
      data: warehouse,
      status: :accepted
    }
  end
end
