Rails.application.routes.draw do
  root 'component#index'
  namespace :api do
    post '/login' => 'user#check'
  end
  get '/*path', to: 'component#index'
end