#----------- USER'S NETWORK -----------

get '/network' do
  @selected_menu_option = 'network'
  erb :"menu-options/network"
end

get '/network/:user_id' do
  @other_user = User.where(id: params[:user_id]).first
  @selected_menu_option = 'network'
  @viewing_other_bookmarks = true
  @bookmarks = @other_user.bookmarks

  erb :"menu-options/_network-friends-bookmarks"
end

get '/network/add/:user_id' do
  user_to_add = User.where(id: params[:user_id]).first

  current_user.creators << user_to_add
  current_user.save!
  content_type :json
  { user: user_to_add }.to_json
end

get '/network/remove/:user_id' do
  user_to_remove = User.where(id: params[:user_id]).first
  current_user.creators.delete(user_to_remove)
  current_user.save!
  content_type :json
  { user: user_to_remove }.to_json
end

get '/update-facebook-friend' do
  puts params
  puts "*" * 60
  @friend = User.where(name: params[:name]).first
  @friend.image = params[:picture]
  @friend.save!

  content_type :json
  { friend: @friend }.to_json
end