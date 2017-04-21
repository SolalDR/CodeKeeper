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
    redirect_to edit_user_registration_path
  end

end
