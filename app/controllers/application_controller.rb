class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :get_lang
  before_action :configure_devise_parameters, if: :devise_controller?
  skip_before_action :verify_authenticity_token, only: :search

  def search
    if params[:text] && params[:text]!=""
      name = params[:text]
      @snippets = Snippet.where("LOWER(name) LIKE ?", "%#{name.downcase}%")
    end
    if !@snippets || params[:text]==""
      render json: false
    else
      render json: @snippets.to_json(include: :lang)
    end
  end

  def home
    @snippets = Snippet.all
  end

  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:firstname, :lastname])
    devise_parameter_sanitizer.permit(:account_update, keys: [:firstname, :lastname])
  end

  private
    def get_lang
      @languages = Lang.all
    end
end
