class ApplicationController < ActionController::Base
  include CanCan::ControllerAdditions

  protect_from_forgery with: :exception
  before_action :get_lang
  before_action :configure_devise_parameters, if: :devise_controller?
  before_action :default_meta_tags
  skip_before_action :verify_authenticity_token, only: :search

  # set_meta_tags :title => 'Code Keeper',
  #               :description => "Super description",
  #               :keywords => 'Code Keeper, version, sauvegarde, github'


  rescue_from CanCan::AccessDenied do |exception|
    # flash[:warning] = exception.message
    flash[:notice] = exception.message
    #Rails regarde dans le mauvais fichier de route (celui de rails_admin donc on redirige en absolu)
    if current_user
      redirect_to "/"
    else
      redirect_to "/users/sign_in"
    end
  end

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


  def default_meta_tags
    set_meta_tags site: 'Code Keeper',
                  description: t("meta_description"),
                  keywords: 'Code Keeper, version, sauvegarde, github'
  end

  private
    def get_lang
      @languages = Lang.all
    end
end
