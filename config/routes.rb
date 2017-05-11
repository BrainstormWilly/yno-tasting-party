Rails.application.routes.draw do

  use_doorkeeper
  default_url_options host: "localhost:3000"

  devise_for :users, :controllers => {
    :registrations => "registrations",
    :invitations => "invitations"
  }

  # Rails only routes

  get 'welcome/index'
  get 'welcome/privacy'

  resources :tastings do
    get "guests/new" => "guests#new", as: "guests_new"
    post "guests/new_invite" => "guests#new_invite", as: "guests_new_invite"
    put "guests/existing_invite/:taster_id" => "guests#existing_invite", as: "guests_existing_invite"
    put "guests/create_and_confirm/:taster_id" => "guests#create_and_confirm", as: "guests_create_and_confirm"
    get "wines/new" => "tasting_wines#new", as: "wines_new"
    put "wines/create/:wine_id" => "tasting_wines#create", as: "wines_create"
    resources :tasters, only: [:new, :create]
  end
  put "tastings/:id/close" => "tastings#close", as: "close_tasting"

  resources :tasters

  resources :guests, only: [:create, :destroy]
  put "guests/:id/confirm" => "guests#confirm", as: "guest_confirm"

  resources :tasting_wines, only: [:destroy]
  put "tasting_wines/:id/reveal/:wine_number" => "tasting_wines#reveal", as: "tasting_wine_reveal"

  # resources :hosts, only: [:update]
  put "hosts/create/:taster_id" => "hosts#create", as: "hosts_create"

  resources :host_locations, only: [:create, :destroy]
  put "host_locations/:id/primary" => "host_locations#set_as_primary", as: "primary_host_location"

  resources :locations
  post "locations/create_for_host" => "locations#create_for_host", as: "create_location_for_host"

  resources :wines, only: [:show, :new, :create, :destroy]

  resources :wine_reviews, only: [:edit, :update]

  authenticated :user do
    root to: 'tastings#index', as: :authenticated_root
  end
  root "welcome#index"


  # Api routes

  namespace :api do
    namespace :alexa do
      namespace :v1 do
        post "requests", to: "requests#default"
      end
    end
  end

end
