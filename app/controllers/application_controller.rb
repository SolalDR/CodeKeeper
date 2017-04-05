class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :get_lang

  def home
    @snippets = Snippet.all
  end

  private
    def get_lang
      @languages = Lang.all
    end
end
