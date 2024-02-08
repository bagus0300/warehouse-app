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
  
  namespace :api do
    resource :shipper, only: [:create, :update, :destroy]
  end

  root 'component#index'
  get '/*path', to: 'component#index'
end