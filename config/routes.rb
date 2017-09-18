Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount Ckeditor::Engine => '/ckeditor'

  root "application#home"

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" } do
    delete 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
  end

  resources :users, :controller => :profile do
    resources :snippets do 
      resources :snippet_versions
    end
  end

  get "like/:key/:id", to: "profile#like", as: :like
  get "unlike/:key/:id", to: "profile#unlike", as: :unlike

  post "search", to: "application#search", as: :search

end
