class SnippetVersionsController < ApplicationController
  before_action :set_snippet_version, only: [:show, :edit, :update, :destroy]

  # GET /snippet_versions
  # GET /snippet_versions.json
  def index
    @snippet_versions = SnippetVersion.all
  end

  # GET /snippet_versions/1
  # GET /snippet_versions/1.json
  def show
  end

  # GET /snippet_versions/new
  def new
    @snippet_version = SnippetVersion.new
  end

  # GET /snippet_versions/1/edit
  def edit
  end

  # POST /snippet_versions
  # POST /snippet_versions.json
  def create
    @snippet_version = SnippetVersion.new(snippet_version_params)

    respond_to do |format|
      if @snippet_version.save
        format.html { redirect_to @snippet_version, notice: 'Snippet version was successfully created.' }
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
        format.html { redirect_to @snippet_version, notice: 'Snippet version was successfully updated.' }
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
    @snippet_version.destroy
    respond_to do |format|
      format.html { redirect_to snippet_versions_url, notice: 'Snippet version was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_snippet_version
      @snippet_version = SnippetVersion.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def snippet_version_params
      params.require(:snippet_version).permit(:content, :version, :doc)
    end
end
