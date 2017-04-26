class ProfileController < ApplicationController

  def show
    if current_user
      @user = current_user
    else
      flash[:notice] = "Connectez vous d'abord pour accéder à votre profil."
      redirect_to new_user_session_path
    end
  end

  def visit
    if params[:id]
      @user = User.find(params[:id])
      if @user
        redirect_to "profile#show"
      end
    end
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
        format.html { redirect_to profile_path, notice: 'Snippet was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def user_params
      params.require(:user).permit(:description, :url_site, :url_github, :lastname, :firstname)
    end
end
