
   def index
    products = Product.includes(:unit_price).all

    render json: {
      data: products.map { |product| ProductSerializer.new(product).as_json },
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
  def destroy
    product = Product.find params[:id]
    if product.destroy
      render :json => {
        status: :accepted
      }
    end
  end
end
