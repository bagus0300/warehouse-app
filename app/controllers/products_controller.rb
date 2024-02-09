
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
      number:                   params[:number],
      packing:                  params[:packing],
      unit_price_id:            params[:unit_price_id],
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
        number:                   params[:number],
        packing:                  params[:packing],
        unit_price_id:            params[:unit_price_id],
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
