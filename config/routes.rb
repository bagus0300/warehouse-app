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
  root 'component#index'
  namespace :api do
    # resource :user, only: %i[create]
    post "/register", to: "users#create"
    post "/login", to: "session#create"
    post "/logout", to: "session#destroy"
  end
  get '/*path', to: 'component#index'
end