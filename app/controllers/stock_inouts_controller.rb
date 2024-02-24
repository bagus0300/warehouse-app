class StockInoutsController < ApplicationController
  protect_from_forgery 
  require 'csv'
  
  def index
    warehouse_id = params[:warehouse_id]
    shipper_id = params[:shipper_id]
    category = params[:category]

    stock_inout = StockInout.includes(:stocks);
    if warehouse_id.present?
      stock_inout = StockInout.joins(:stock)
          .where(stocks: { warehouse_id: warehouse_id})
    end

    if shipper_id.present?
      stock_inout = stockInout.where(stocks: {shipper_id: shipper_id})
    end

    if category.present? 
      stock_inout = stockInout.where(category: 0)
    end

    stock_inout = stockInout.all
  
    render json: {
      data: stock_inouts.map { |stock_inout| StockInoutSerializer.new(stock_inout).as_json },
      status: :accepted
    }
  end

  def create
    request_params.each do |record|
      ActiveRecord::Base.transaction do
        stock_inout_params = ActionController::Parameters.new(record).permit(
          :warehouse_id, :shipper_id, :product_id, :category, :amount, :inout_on,
          :handling_fee_rate, :storage_fee_rate, :lot_number, :weight
        )
        stock = Stock.find_by(
          warehouse_id:     stock_inout_params[:warehouse_id],
          shipper_id:       stock_inout_params[:shipper_id],
          product_id:       stock_inout_params[:product_id],
        );

        category = params[:category]

        if stock.present?
          adjusted_total_amount = calculate_adjusted_total_amount(stock, stock_inout_params)
          stock.update(
            total_amount: adjusted_total_amount
          )
        else
          stock = Stock.create(
            warehouse_id:   stock_inout_params[:warehouse_id],
            shipper_id:     stock_inout_params[:shipper_id],
            product_id:     stock_inout_params[:product_id],
            total_amount:   stock_inout_params[:amount]
          )
        end
        if stock.persisted?
          StockInout.create(
            stock_id:             stock.id,
            category:             stock_inout_params[:category],
            inout_on:             stock_inout_params[:inout_on],
            amount:               stock_inout_params[:amount],
            handling_fee_rate:    stock_inout_params[:handling_fee_rate],
            storage_fee_rate:     stock_inout_params[:storage_fee_rate],
            lot_number:           stock_inout_params[:lot_number],
            weight:               stock_inout_params[:weight],
            creator_id:           1
          )
        end
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

  def show_by_id
    stock_inout = StockInout.includes(:stocks).find(params[:stock_id])
  
    render json: {
      data: StockInoutSerializer.new(stock_inout).as_json,
      status: :accepted
    }
  end

  def export_csv
    data = params.require(:data)
    csv_data = CSV.generate do |csv|
      csv << ["品名", "荷姿", "ロット番号", "重量", "数量"]
      data.each do |record|
        csv << [record.dig(:product_name), record.dig(:product_type), record.dig(:lot_number), record.dig(:weight), record.dig(:amount)]
      end
    end
    
    search_values = [shipper_id, warehouse_id]
    send_data csv_data, filename: "stock.csv", type: "text/csv", disposition: "inline"
  end
  def inventory
    shipper_id = params[:shipper_id].presence || ''
    warehouse_id = params[:warehouse_id].presence || ''
    result = StockInoutsHelper.build_main_query(shipper_id, warehouse_id)

    render json: result
  end

  private
  def calculate_adjusted_total_amount(stock, stock_inout_params)
    existing_total_amount = stock.total_amount
    category = stock_inout_params[:category]

    new_total_amount = category == 0 ? (existing_total_amount.to_i + stock_inout_params[:amount].to_i) : (existing_total_amount.to_i - stock_inout_params[:amount].to_i)
    new_total_amount
  end

  def request_params
    params.require(:stock_inout).map do |uparams|
      {
        warehouse_id:         uparams["warehouse_id"], 
        shipper_id:           uparams["shipper_id"], 
        product_id:           uparams["product_id"], 
        category:             uparams["category"], 
        amount:               uparams["amount"], 
        inout_on:             uparams["inout_on"],
        handling_fee_rate:    uparams["handling_fee_rate"],
        storage_fee_rate:     uparams["storage_fee_rate"],
        lot_number:           uparams["lot_number"],
        weight:               uparams["weight"],
      }
    end
  end
  
end