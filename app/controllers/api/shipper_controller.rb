class Api::ShipperController < ApplicationController
  respond_to :json
  
  def index
    # shipper = Shipper.
  end
  def create
    puts params[:post_code]
    puts "----------------"
    puts params[:shipper_name]
    
    # shipper = Shipper.create()
    # return render json :{
    #   status
    # }
  end
  def update
    
  end
  def destroy
    
  end
  # def request_params
  #   param.(:id, :shipper_name, :post_code, :address1, :address2, :telephone_number, :closing_date, :calc_category, :used_tsubo_price, :discount_date)
  # end

  def request_params
    request.request_parameters 
  end

end
