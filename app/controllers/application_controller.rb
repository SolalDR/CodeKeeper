class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :get_lang
  skip_before_action :verify_authenticity_token, only: :search

  def search
    if params[:text] && params[:text]!=""
      name = params[:text]
      @snippets = Snippet.where("LOWER(name) LIKE ?", "%#{name.downcase}%")
    end
    if !@snippets || params[:text]==""
      render json: false
    else
      render json: @snippets
    end
  end

  def home
    @snippets = Snippet.all
  end

  private
    def get_lang
      @languages = Lang.all
    end
end
