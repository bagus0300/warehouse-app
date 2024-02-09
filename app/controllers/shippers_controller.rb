class ShippersController < ApplicationController
  def index
    shipperMaster = ShipperMaster.all

    render :json => {
      data:       shipperMaster,
      status:     :accepted
    }

  end
  def create
    shipperMaster = ShipperMaster.find_or_create_by(
      shipper_name:       params[:shipper_name],
      post_code:          params[:post_code],
      address1:           params[:address1],
      address2:           params[:address2],
      telephone_number:   params[:telephone_number],
      closing_date:       params[:closing_date],
      calc_category:      params[:calc_category],
      used_tsubo_price:   params[:used_tsubo_price],
      discount_rate:      params[:discount_rate]
    )

    if shipperMaster.save
      render :json => {
        shipperMaster:    shipperMaster,
        status:           :accepted
      }
    end
  end
  def update
    if ShipperMaster.where(id: params[:id]).update_all(
        shipper_name:               params[:shipper_name],
        post_code:                  params[:post_code],
        address1:                   params[:address1],
        address2:                   params[:address2],
        telephone_number:           params[:telephone_number],
        closing_date:               params[:closing_date],
        calc_category:              params[:calc_category],
        used_tsubo_price:           params[:used_tsubo_price],
        discount_rate:              params[:discount_rate]
      )
    render :json => {
      status: :accepted
    }
    end
  end
  def destroy
    shippermaster = ShipperMaster.find params[:id]
    if shippermaster.destroy
      render :json => {
        status: :accepted
      }
    end
  end
end