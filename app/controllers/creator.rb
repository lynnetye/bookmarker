#----------- A SINGLE USER'S CREATORS -----------
#----------- (people s/he follows) -----------

get '/creators' do
  @section = "your-creators"
  erb :"_user-homepage"
end