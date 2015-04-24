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

# remove for heroku
#----------- GITHUB -----------

# get '/github' do
#   api = Github::Client.new(ENV["GITHUB_KEY"], "lynne")
#   @org = api.get_org("sf-rock-doves-2015")

#   erb :index
# end
