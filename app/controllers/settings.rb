#----------- USER'S ACCOUT SETTINGS -----------

get '/settings' do
  @selected_menu_option = 'settings'
  erb :"menu-options/settings"
end