#----------- USER'S NETWORK -----------

get '/network' do
  @selected_menu_option = 'network'
  erb :"menu-options/network"
end