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

  get '/*path', to: 'component#index'
 
  root 'component#index'
end
