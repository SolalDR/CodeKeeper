Rails.application.routes.draw do

  root "application#home"

  resources :snippet_versions
  resources :snippets

  get '/snippets/:id/new-v', to: 'snippet_versions#new', as: :new_version_from_snippet
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
