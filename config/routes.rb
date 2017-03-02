Rails.application.routes.draw do
  resources :snippet_versions
  resources :snippets
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
