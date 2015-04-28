#----------- LANDING PAGE -----------

get '/' do
  if session[:user_id]
    @bookmarks = users_bookmarks
  end
  erb :index
end

#----------- SESSIONS -----------

get '/login' do
  @user = User.new
  erb :"users/login"
end

post '/login' do
  @user = User.where(email: params[:email]).first
  if @user && @user.password == params[:password]
    login_as_user(@user)
    redirect '/bookmarks'
  else
    @login_failed = true
    erb :"users/login"
  end
end

get '/logout' do
  logout!
  redirect '/'
end

#----------- LOGIN WITH FACEBOOK -----------

post '/facebook-login' do
  session[:accessToken] = params[:accessToken]
  session[:facebookID] = params[:fb_id]
  email = params[:email]
  if User.where(email: email).first == nil
    User.create!({
      name: params[:first] + " " + params[:last],
      email: email,
      facebook_id: params[:facebook_id]
    })
  else
    @user = User.where(email: email).first
    @user.facebook_id = params[:facebook_id]
    @user.save!
  end
  @user = User.where(email: email).first
  login_as_user(@user)

  return { success: true }.to_json
end
