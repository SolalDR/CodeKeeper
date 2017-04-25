class OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def github
    auth = request.env["omniauth.auth"]
    if User.find_by(email: auth.info.email)
      @user = User.find_by(email: auth.info.email)
      @user.provider = auth.provider
      @user.uid = auth.uid
      @user.save
    else
      @user = User.from_omniauth(auth)
    end
    sign_in_and_redirect @user
  end

  def failure
    redirect_to root_path
  end
end
