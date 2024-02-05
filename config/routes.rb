Rails.application.routes.draw do
<<<<<<< HEAD
  root 'component#index'
  namespace :api do
    # resource :user, only: %i[create]
    post "/register", to: "users#create"
    post "/login", to: "session#create"
    post "/logout", to: "session#destroy"
  end
=======
  devise_for :users
>>>>>>> 36c0d0eac0a3e2cf7872d018c7481cde53310ced
  get '/*path', to: 'component#index'
  namespace :api do
    post '/login' => 'user#login'
  end
  root 'component#index'
end