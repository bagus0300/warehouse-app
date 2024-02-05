Rails.application.routes.draw do
  devise_for :users
  get '/*path', to: 'component#index'
  namespace :api do
    post '/login' => 'user#login'
  end
  root 'component#index'
end