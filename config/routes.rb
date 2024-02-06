Rails.application.routes.draw do
  root 'component#index'
  namespace :api do
    # resource :user, only: %i[create]
    post "/register", to: "users#create"
    post "/login", to: "session#create"
    post "/logout", to: "session#destroy"
  end
  get '/*path', to: 'component#index'
  root 'component#index'
end