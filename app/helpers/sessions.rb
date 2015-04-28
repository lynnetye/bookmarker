helpers do

  def current_user
    @current_user ||= User.where(id: session[:user_id]).first if session[:user_id]
  end

  def login_as_user(user)
    session[:user_id] = user.id
  end

  def logged_in?
    session[:user_id]
  end

  def logout!
    session[:user_id] = nil
  end

  def find_user(user_id)
    User.where(id: user_id).first
  end

  def raise_error_if_no(user)
    if user.nil?
      status 404
      return "User not found"
    end
  end

end


