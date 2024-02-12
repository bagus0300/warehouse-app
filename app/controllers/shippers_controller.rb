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
        name:                       params[:name],
        code:                       params[:code],
        post_code:                  params[:warehouse_fee_id],
        main_address:               params[:main_address],
        sub_address:                params[:sub_address],
        tel:                        params[:tel],
        closing_date:               params[:closing_date],
    )

    if shipper.save
      render :json => {
        shipper:          shipper,
        status:           :accepted
      }
    end
  end
  def update
    if Shipper.where(id: params[:id]).update_all(
        name:                       params[:name],
        code:                       params[:code],
        post_code:                  params[:post_code],
        main_address:               params[:main_address],
        sub_address:                params[:sub_address],
        tel:                        params[:tel],
        closing_date:               params[:closing_date],
      )
    render :json => {
      status: :accepted
    }
    end
  end
  def destroy
    shipper = Shipper.find params[:id]
    if shipper.destroy
      render :json => {
        status: :accepted
      }
    end
  end
end