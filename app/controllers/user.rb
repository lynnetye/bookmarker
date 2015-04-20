#----------- USERS -----------

get '/signup' do
  @user = User.new
  erb :"users/new"
end

post '/users' do
  # sign-up a new user
  @user = User.new(
    name: params[:name],
    email: params[:email],
    password: params[:password],
  )
  if @user.save
    login_as_user(@user)
    redirect '/'
  else
    erb :"users/new"
  end
end