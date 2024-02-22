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

  get "/api/product", to: 'products#index'
  post "/api/product" , to: 'products#create'
  put "/api/product" , to: 'products#update'
  delete "/api/product" , to: 'products#destroy'
  get "/api/product_detail", to:'products#show_by_id'
  post "/api/product_export", to: 'products#pdf_export'
  get "/api/product_csv_export", to: 'products#csv_export'
  get "/api/product_set", to: 'products#with_in_stock'
  get "/api/product_stock", to: 'products#with_stock'
  
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
  get "/api/stock_inout"  , to: 'stock_inouts#index'
  post "/api/export_instock_csv", to: 'stock_inouts#export_csv'

  get "/api/received_payment", to: 'received_payments#index'
  post "/api/received_payment", to: 'received_payments#create'
  put "/api/received_payment", to: 'received_payments#update'
  delete "/api/received_payment", to: 'received_payments#destroy'
  get "/api/client_page", to: 'client_pages#index'
  
  get "/api/user", to: 'users#index'
  put "/api/user", to: 'users#update'
  post "/api/user", to: 'users#create_or_update'

  get "/api/authorities", to: 'authorities#index'
  get "/api/client_page", to: 'client_pages#index'
  get "/api/get_all_auth_data", to: 'authority_client_pages#index'
  post "/api/set_auth_data", to: 'authority_client_pages#create_or_update'



  get '/*path', to: 'component#index'


  # get "/api/warehouse", to: 'warehouses#index'
 
  root 'component#index'  
end
