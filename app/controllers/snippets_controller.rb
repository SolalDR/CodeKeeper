class SnippetsController < ApplicationController
  load_and_authorize_resource


  before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

  before_action :set_snippet, only: [:show, :edit, :update, :destroy]
  before_action :set_meta_tags_page, only: [:show, :edit, :update, :destroy]
 
  before_action :set_user
  before_action :check_snippet_user, only: [:edit, :update, :destroy]

  # GET /snippets
  # GET /snippets.json

  def index
    @snippets = @user.snippets; 
    @snippets = @snippets.not_private unless @user.id == current_user.id
  end

  # GET /snippets/1
  # GET /snippets/1.json
  def show
    if current_user && current_user.id != @user.id && @snippet.private
      throw ActiveRecord::RecordNotFound
    end
  end

  # GET /snippets/new
  def new
    @snippet = Snippet.new(user: current_user)
  end

  # GET /snippets/1/edit
  def edit
  end

  # POST /snippets
  # POST /snippets.json
  def create
    @snippet = Snippet.new snippet_params.except(:snippet_versions_attributes)

    if !validate_params_create
      flash[:notice] = "Il faut rentrer du contenu dans votre snippet"
      redirect_to :new_snippet
    else

      @snippet.user = current_user
      respond_to do |format|
        if @snippet.save && @snippet.update(snippet_params.slice(:snippet_versions_attributes))
          format.html { redirect_to user_snippet_path(id:@snippet.id), notice: 'Snippet was successfully created.' }
          format.json { render :show, status: :created, location: @snippet }
        else
          format.html { render :new }
          format.json { render json: @snippet.errors, status: :unprocessable_entity }
        end
      end

    end
    
  end

  # PATCH/PUT /snippets/1
  # PATCH/PUT /snippets/1.json
  def update
    respond_to do |format|
      if @snippet.update(snippet_params)
        format.html { redirect_to user_snippet_path(user_id: @snippet.user, id:@snippet), notice: 'Snippet was successfully updated.' }
        format.json { render :show, status: :ok, location: @snippet }
      else
        format.html { render :edit }
        format.json { render json: @snippet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /snippets/1
  # DELETE /snippets/1.json
  def destroy
    @snippet.destroy
    respond_to do |format|
      format.html { redirect_to user_snippets_path(user_id: current_user), notice: 'Snippet was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_snippet
      @snippet = Snippet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def snippet_params
      params.require(:snippet).permit(:description, :lang_id, :abstract, :name, :private, snippet_versions_attributes: [:content, :version, :doc, :comment])
    end

    def set_meta_tags_page
      set_meta_tags title: @snippet.name,
                    description: @snippet.description
    end

    def validate_params_create
      if snippet_params[:snippet_versions_attributes]["0"][:content].to_s.empty?
        return false
      else
        return true
      end
    end

    def check_snippet_user
      if @user.id != current_user.id
        redirect_to [@snippet.user, @snippet], notice: "Vous n'avez pas la permission de modifier ou supprimer ce snippet."
      end
    end

    def set_user 
      @user = User.find(params[:user_id]); 
    end

end
