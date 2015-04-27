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

get '/add/:user_id' do
  user_to_add = User.where(id: params[:id]).first

  current_user.creators << user_to_add
  current_user.save!
end