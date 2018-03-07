Rails.application.routes.draw do

  resources :comments
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  root to: 'snaps#index'

  
  resources :snaps
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
