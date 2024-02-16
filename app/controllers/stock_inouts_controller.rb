class StockInoutsController < ApplicationController
  protect_from_forgery 
  def create
    # puts "-----------------------current user------------------"
    # puts current_user.inspect
    # puts "--------------------------------------"
    request_params.each do |record|
      # stock_inout_params = record.permit(:warehouse_id, :shipper_id, :product_id, :category, :amount, :inout_on, :handling_fee_rate, :storage_fee_rate, :lot_number, :weight)

      stock_inout_params = ActionController::Parameters.new(record).permit(
        :warehouse_id, :shipper_id, :product_id, :category, :amount, :inout_on,
        :handling_fee_rate, :storage_fee_rate, :lot_number, :weight
      )
      stock = Stock.find_by(
        warehouse_id:     params[:warehouse_id],
        shipper_id:     params[:shipper_id],
        product_id:     params[:product_id],
      );
      category = params[:category]
      if stock.present?
        puts "-----------------present---------------------"
        adjusted_total_amount = calculate_adjusted_total_amount(stock, stock_inout_params)
        stock.update(
          total_amount: adjusted_total_amount
        )
      else
        stock = Stock.create(
          warehouse_id: stock_inout_params[:warehouse_id],
          shipper_id: stock_inout_params[:shipper_id],
          product_id: stock_inout_params[:product_id],
          total_amount: stock_inout_params[:amount]
        )
      end
      if stock.persisted?
        StockInout.create(
          stock_id: stock.id,
          category: stock_inout_params[:category],
          inout_on: stock_inout_params[:inout_on],
          amount: stock_inout_params[:amount],
          handling_fee_rate: stock_inout_params[:handling_fee_rate],
          storage_fee_rate: stock_inout_params[:storage_fee_rate],
          lot_number: stock_inout_params[:lot_number],
          weight: stock_inout_params[:weight],
          creator_id: 1
        )
      end
    end

    render :json => {
      status: :accepted
    }
   rescue ActiveRecord::RecordInvalid => e
    render :json => {
      status: :unprocessable_entity,
      errors: e.record.errors.full_messages
    }
  end
  private
  def calculate_adjusted_total_amount(stock, stock_inout_params)
    existing_total_amount = stock.inspect.total_amount
    category = stock_inout_params[:category]
    new_total_amount = category == 0 ? (existing_total_amount + stock_inout_params[:amount]) : (existing_total_amount - stock_inout_params[:amount])
    new_total_amount
  end
  def request_params
    params.require(:stock_inout).map do |uparams|
      {
        warehouse_id: uparams["warehouse_id"], 
        shipper_id: uparams["shipper_id"], 
        product_id: uparams["product_id"], 
        category: uparams["category"], 
        amount: uparams["amount"], 
        inout_on: uparams["inout_on"],
        handling_fee_rate: uparams["handling_fee_rate"],
        storage_fee_rate: uparams["storage_fee_rate"],
        lot_number: uparams["lot_number"],
        weight: uparams["weight"],
      }
    end
  end
end