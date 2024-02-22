

class ProductsController < ApplicationController
  # protect_from_forgery 
  def index
    keyword = params[:keyword]
    offset = params[:offset]
    limit = params[:limit]
    products = Product.includes(:warehouse_fee)
  
    if keyword.present?
      products = products.where("name LIKE ?", "%#{keyword}%")
    end
    count = products.count
    filtered_products = products.offset(offset).limit(limit)
   
    render json: {
      data: filtered_products.map { |product| ProductSerializer.new(product).as_json },
      count: count,
      status: :accepted
    }
  end
  def create
    product = Product.find_or_create_by(
      name:                     params[:name],
      code:                     params[:code],
      warehouse_fee_id:         params[:warehouse_fee_id],
      specification:            params[:specification],
    )

    if product.save
      render :json => {
        shipper:          product,
        status:           :accepted
      }
    end
  end
  def update
    if Product.where(id: params[:id]).update_all(
      name:                     params[:name],
      code:                     params[:code],
      warehouse_fee_id:         params[:warehouse_fee_id],
      specification:            params[:specification],
      )
    render :json => {
      status: :accepted
    }
    end
  end
  def show_by_id
    puts "-----------------"
    puts params[:id]
    product = Product.includes(:warehouse_fee).find(params[:id])
    render :json => {
      data: ProductSerializer.new(product).as_json ,
      status: :accepted
    }
  end
  def destroy
    product = Product.find params[:id]
    if product.destroy
      render :json => {
        status: :accepted
      }
    end
  end
end
