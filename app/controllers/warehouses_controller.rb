class WarehousesController < ApplicationController
  def index
    warehouse = Warehouse.all
    render :json => {
      data: warehouse,
      status: :accepted
    }
  end
end
