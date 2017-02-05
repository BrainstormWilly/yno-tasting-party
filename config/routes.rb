Rails.application.routes.draw do

  devise_for :users, :controllers => { :registrations => "registrations" }

  get 'welcome/index'

  resources :tastings do
    resources :tasting_wines, only: [:create, :destroy]
    resources :wines, only: [:new, :create, :destroy]
  end

  resources :tasters, only: [:new, :update, :create]
  resources :hosts, only: [:new, :update, :create]
  # resources :wines

  authenticated :user do
    root to: 'tastings#index', as: :authenticated_root
  end
  root "welcome#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
