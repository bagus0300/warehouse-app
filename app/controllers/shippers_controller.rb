class ShippersController < ApplicationController
  def index
    shipper = Shipper.all

    render :json => {
      data:       shipper,
      status:     :accepted
    }

  end
  def create
    shipper = Shipper.find_or_create_by(
      name:       params[:name],
      post_code:          params[:post_code],
      address1:           params[:address1],
      address2:           params[:address2],
      telephone_number:   params[:telephone_number],
      closing_date:       params[:closing_date],
      calc_category:      params[:calc_category],
      used_tsubo_price:   params[:used_tsubo_price],
      discount_rate:      params[:discount_rate]
    )

    if shipper.save
      render :json => {
        shipper:    shipper,
        status:           :accepted
      }
    end
  end
  def update
    if Shipper.where(id: params[:id]).update_all(
        name:               params[:name],
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
    shippermaster = Shipper.find params[:id]
    if shippermaster.destroy
      render :json => {
        status: :accepted
      }
    end
  end
end