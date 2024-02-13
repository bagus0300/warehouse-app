Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  get "/api/shipper", to: 'shippers#index'
  post "/api/shipper" , to: 'shippers#create'
  put "/api/shipper" , to: 'shippers#update'
  delete "/api/shipper" , to: 'shippers#destroy'

  get "/api/warehouse", to: 'warehouses#index'
  post "/api/warehouse" , to: 'warehouses#create'
  put "/api/warehouse" , to: 'warehouses#update'
  delete "/api/warehouse" , to: 'warehouses#destroy'

  get "/api/product_dd", to:'products#show_by_id'
  get "/api/product", to: 'products#index'
  get "/api/product_detail", to:'products#show_with_warehouse_fee'
  post "/api/product" , to: 'products#create'
  put "/api/product" , to: 'products#update'
  delete "/api/product" , to: 'products#destroy'

  get "/api/warehouse_fee", to: 'warehouse_fees#index'
  post "/api/warehouse_fee" , to: 'warehouse_fees#create'
  put "/api/warehouse_fee" , to: 'warehouse_fees#update'
  delete "/api/warehouse_fee" , to: 'warehouse_fees#destroy'

  
  get "/api/processing_data", to: 'processing_datas#index'
  post "/api/processing_data", to: 'processing_datas#create'
  put "/api/processing_data", to: 'processing_datas#update'
  delete "/api/processing_data", to: 'processing_datas#destroy'
  get "/api/processing_data/export_csv", to: 'processing_datas#export_csv'

  post "/api/stock_inout"  , to: 'stock_inouts#create'
  
  get '/*path', to: 'component#index'



  # get "/api/warehouse", to: 'warehouses#index'
 
  root 'component#index'  
end
