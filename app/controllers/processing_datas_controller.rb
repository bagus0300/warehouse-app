class ProcessingDatasController < ApplicationController
  def index

  end
  def create
    processingData = ProcessingData.create(request_params)
    if processingData.save
      render :json => {
        status: :accepted
      }
    end
  end
  def update
    if ProcessingData.where(id: params[:id]).update_all(request_params)
      render :json => {
        status: :accepted
      }
    end
  end
  def destroy
    processingData = ProcessingData.find params[:id]
    if processingData.destroy
      render :json => {
        status: :accepted
      }
    end

  end
  def export_csv
      processingData = ProcessingData.all
      render processingData.to_csv, filename: 'test'
  end
  def request_params
    params.permit(:warehouse_id, :processing_classfication, :processing_date, :shipper_code, :processing_no, :lot_num, :weight, :processing_num, :unit_price, :is_canceled, :reg_user_id)
  end
  
end
