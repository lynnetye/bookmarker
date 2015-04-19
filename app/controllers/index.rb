get '/' do
  erb :index
end

#----------- SESSIONS -----------

get '/login' do
  # render sign-in page
  erb :"users/login"
end

post '/login' do
  @user = User.where(email: params[:email]).first
  if @user && @user.password == params[:password]
    login_as_user(@user)
    redirect '/'
  else
    @login_failed = true
    erb :"users/login"
  end
end

get '/logout' do
  logout!
  redirect '/'
end
