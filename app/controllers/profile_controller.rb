class ProfileController < ApplicationController

  before_action :set_user 
  before_action :is_current_user, only: [:edit, :update, :destroy]

  def show
  end

  def edit
    if current_user
      @user = current_user
    else
      flash[:notice] = "Vous n'êtes pas connecté"
      redirect_to new_user_session_path
    end
  end

  def update
    @user = current_user
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_path(current_user), notice: 'Snippet was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end


  def like
    @user = current_user
    # Get object liked
    if params[:key] == "snippet"
      obj =  Snippet.find(params[:id])
    end
    # If current_user is not owner
    if obj && obj.user != @user
      like = @user.likes.find_by(likable_type: params[:key], likable_id: params[:id])
      # And he doesn't like yet
      if !like
        like = Like.create(user: @user, likable_type: params[:key], likable_id: params[:id])
      end
    end
    redirect_to user_path(current_user)
  end



  def unlike
    @user = current_user
    # Get object liked
    if params[:key] == "snippet"
      obj =  Snippet.find(params[:id])
    end
    # If current_user is not owner
    if obj && obj.user != @user
      like = @user.likes.find_by(likable_type: params[:key], likable_id: params[:id])
      # And he doesn't like yet
      if like
        like.destroy
      end
    end

    redirect_to user_path(current_user)
  end

  private
    def user_params
      params.require(:user).permit(:description, :url_site, :url_github, :lastname, :firstname, :nickname)
    end

    def set_user 
      @user = User.find(params[:id]); 
      if !@user 
        redirect_to root_path
      end
    end

    def is_current_user 
      if !current_user ||current_user.id != @user.id
        throw ActiveRecord::RecordNotFound
      end 
    end
end
