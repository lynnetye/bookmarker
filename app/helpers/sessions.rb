helpers do

  def current_user
    @current_user ||= User.where(id: session[:user_id]).first if session[:user_id]
  end

  def current_user_id
    session[:user_id]
  end

  def login_as_user(user)
    session[:user_id] = user.id
  end

  def logged_in?
    !session[:user_id].nil?
  end

  def logout!
    session[:user_id] = nil
  end

end
