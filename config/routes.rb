Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount Ckeditor::Engine => '/ckeditor'
  devise_for :users
  root "application#home"
  resources :snippets do
    resources :snippet_versions, only: [:new]
  end
  resources :snippet_versions, except: [:new]

  post "search", to: "application#search", as: :search

  # get '/snippets/:id/new-v', to: 'snippet_versions#new', as: :new_version_from_snippet
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
