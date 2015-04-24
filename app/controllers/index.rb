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
