#----------- A SINGLE USER'S ADMIRERS -----------
#----------- (people who follow him/her) -----------

get '/admirers' do
  @section = "your-admirers"
  erb :"_user-homepage"
end