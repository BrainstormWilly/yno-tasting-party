Rails.application.routes.draw do

  devise_for :users, :controllers => {
    :registrations => "registrations",
    :invitations => "invitations"
  }

  get 'welcome/index'

  resources :tastings do
    resources :wines, only: [:new, :create]
    get "guests/new" => "guests#new", as: "guests_new"
    post "guests/new_invite" => "guests#new_invite", as: "guests_new_invite"
    put "guests/existing_invite/:taster_id" => "guests#existing_invite", as: "guests_existing_invite"
    put "guests/create_and_confirm/:taster_id" => "guests#create_and_confirm", as: "guests_create_and_confirm"
    resources :tasters, only: [:new, :create]
  end
  put "tastings/:id/close" => "tastings#close", as: "close_tasting"

  resources :tasters, only: [:edit, :update, :destroy]

  resources :guests, only: [:create, :destroy]
  put "guests/:id/confirm" => "guests#confirm", as: "guest_confirm"

  resources :tasting_wines, only: [:create, :destroy]

  resources :hosts, only: [:new, :update, :create]

  resources :wine_reviews, only: [:edit, :update]

  authenticated :user do
    root to: 'tastings#index', as: :authenticated_root
  end
  root "welcome#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
