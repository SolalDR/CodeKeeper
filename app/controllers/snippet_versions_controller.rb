class SnippetVersionsController < ApplicationController
  load_and_authorize_resource
  before_action :authenticate_user!, except: [:show]
  before_action :set_snippet_version, only: [:show, :edit, :update, :destroy]
  before_action :set_meta_tags_page, only: [:show, :edit, :update, :destroy]


  # GET /snippet_versions/1
  # GET /snippet_versions/1.json
  def show
  end

  # GET /snippet_versions/new
  def new
    @snippet_version = SnippetVersion.new
    if params[:snippet_id] && Snippet.where(id: params[:snippet_id]).length>0
      @snippet = Snippet.find(params[:snippet_id])
      if @snippet.user != current_user
        flash[:notice] = I18n.t("snippet_version.error.owner")
        redirect_to @snippet
      end
      @snippet_version.snippet_id = params[:snippet_id]
    else
      flash[:notice] = I18n.t("snippet_version.error.no_snippet_id")
      redirect_to root_path
    end
  end

  # GET /snippet_versions/1/edit
  def edit
  end

  # POST /snippet_versions
  # POST /snippet_versions.json
  def create
    @snippet = Snippet.find(snippet_version_params[:snippet_id])
    @last_version = @snippet.snippet_versions.last
    puts @last_version.content
    @snippet_version = SnippetVersion.new(snippet_version_params)
    if @last_version.content == snippet_version_params[:content]
      redirect_to @snippet, notice: I18n.t("snippet_version.error.same_content")
      return nil
    end
    respond_to do |format|
      if @snippet_version.save
        format.html { redirect_to @snippet_version.snippet, notice: I18n.t("snippet_version.success.create") }
        format.json { render :show, status: :created, location: @snippet_version }
      else
        format.html { render :new }
        format.json { render json: @snippet_version.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /snippet_versions/1
  # PATCH/PUT /snippet_versions/1.json
  def update
    respond_to do |format|
      if @snippet_version.update(snippet_version_params)
        format.html { redirect_to @snippet_version.snippet, notice: I18n.t("snippet_version.success.update") }
        format.json { render :show, status: :ok, location: @snippet_version }
      else
        format.html { render :edit }
        format.json { render json: @snippet_version.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /snippet_versions/1
  # DELETE /snippet_versions/1.json
  def destroy
    puts "*"*100
    @snippet_version.destroy
    respond_to do |format|
      format.html { redirect_to snippet_versions_url, notice: I18n.t("snippet_version.success.destroy") }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_snippet_version
      @snippet_version = SnippetVersion.find(params[:id])
      @snippet = Snippet.find(@snippet_version.snippet_id)
    end

    def set_meta_tags_page
      set_meta_tags title: @snippet.name + @snippet_version.version,
                    description: @snippet.description
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def snippet_version_params
      params.require(:snippet_version).permit(:content, :doc, :comment, :snippet_id, :type_version)
    end
end
