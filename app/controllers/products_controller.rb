

class ProductsController < ApplicationController
  require 'grover'
  require 'csv'
  protect_from_forgery 
  
  def index
    keyword = params[:keyword].presence || ""
    offset = params[:offset].presence || "" 
    limit = params[:limit].presence || ""
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
  def with_in_stock
    warehouse_id = params[:warehouse_id]
    shipper_id = params[:shipper_id]
    category = params[:category]

    result = StockInout.joins(:stock)
                       .merge(Stock.filtered(warehouse_id, shipper_id))
                       .select("concat(products.name, '(', stock_inouts.lot_number, ')') product_name, stocks.product_id AS product_id, stock_inouts.inout_on, stock_inouts.lot_number, stock_inouts.weight, stock_inouts.id stock_inout_id, stock_inouts.amount stock_inout_amount")

    render json: {
      data: result,
      # data: subquery,
      status: :accepted
    }

  end
  def with_stock

    product_id = params[:product_id]
    stock_id = params[:id]

    product = Product.includes(:warehouse_fee).find(product_id)
    # stock = Stock.select("total_amount").find(stock_id)

    render :json => {
      data: ProductSerializer.new(product).as_json ,
      # stock: stock,
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
    puts "-----------------------"
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

  def pdf_export
    # html = '<h1>Hello, Grover!</h1>'
    # pdf_options = {} # Optional settings for Grover
    # pdf_bytes = ::Grover::HtmlConverter.convert_to_pdf(html, pdf_options)

    # # Send the PDF bytes as a response
    # send_data pdf_bytes, filename: "#{params[:filename].presence || 'generated_pdf'}.pdf", type: 'application/pdf'

    # html_string = render_to_string(template: 'products/show.html.erb', layout: false, formats: [:html])
    # html_string = render_to_string(:template => 'template.html.erb', :layout => false, :formats => [:html])
    # html_string = render_to_string(:template => 'pdf/template.html.erb', :layout => false, :formats => [:html])
    

    # html_string = render_to_string({
    #   template: 'controller/view',
    #   layout: 'template',
    #   # locals: { :@instance_var => ... }
    # })

    # tempfile = Tempfile.open(['template', '.html'])
    # tempfile.write(html_string)
    # tempfile.rewind

    # doc = Grover::HTMLDocument.from_string(html_string)
    # pdf_io = StringIO.new

    # options = {
    #   margin: { top: 36, bottom: 36, left: 36, right: 36},
    #   orientation: :landscape
    # }

    # doc.render_to_pdf(pdf_io, options)
    # pdf_data = pdf_io.string
    # tempfile.close


    html = "<h1>Hello, Everyone!</h1>";
    filename = "template"
    pdf = Grover.new(html, format: 'A4').to_pdf
    send_data pdf, filename: filename, type: "application/pdf"

    # send_data pdf_data, filename: "products.pdf", type: "application/pdf", disposition: "attachment"
  end

  def csv_export
    # products = User.all

    # csv_data = CSV.generate do |csv|
    #   csv << ['user_name', 'email', 'login_id']
    #   products.each do |product|
    #     csv << [product.user_name, product.email, product.login_id]
    #   end
    # end

    # send_data csv_data, filename: "products.csv", type: "text/csv", disposition: "attachment"


    users = User.all()
    csv_data = CSV.generate do |csv|
      csv << ["user_name", "login_id", "email"]
      users.each do |user|
        csv << [user.user_name, user.login_id, user.email]
      end
    end

    send_data csv_data, filename: "products.csv", type: "text/csv", disposition: "inline"
   
  end
end
