Rails.application.routes.draw do
  root 'component#index'
  get '/*path', to: 'component#index'
end