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

  get "/api/unit_price", to: 'unit_prices#index'
  post "/api/unit_price" , to: 'unit_prices#create'
  put "/api/unit_price" , to: 'unit_prices#update'
  delete "/api/unit_price" , to: 'unit_prices#destroy'

  
  get "/api/processing_data", to: 'processing_datas#index'
  post "/api/processing_data", to: 'processing_datas#create'
  put "/api/processing_data", to: 'processing_datas#update'
  delete "/api/processing_data", to: 'processing_datas#destroy'
  get "/api/processing_data/export_csv", to: 'processing_datas#export_csv'

  get '/api/product' , to: 'products#index'
  
  get '/*path', to: 'component#index'
 
  root 'component#index'
end
