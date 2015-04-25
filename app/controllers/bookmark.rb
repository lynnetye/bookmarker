#----------- A SINGLE USER'S BOOKMARKS -----------

get '/bookmarks' do
  @bookmarks = current_user.bookmarks.all
  @selected_menu_option = 'my-bookmarks'
  erb :"menu-options/my-bookmarks"
end

put '/bookmarks/:id' do
  bookmarks = users_bookmarks
  @bookmark = bookmarks.where(id: params[:id]).first
  @bookmark.update(
    name: params[:name],
    url: params[:url],
  )

  { bookmark: @bookmark}.to_json
end

delete '/bookmarks/:id' do
  bookmarks = users_bookmarks
  @bookmark = bookmarks.where(id: params[:id]).first
  @bookmark.delete
  content_type :json
  { id: params[:id] }.to_json
end

get '/bookmarks/new' do
  @bookmarks = current_user.bookmarks.all
  @selected_menu_option = 'add-new-bookmark'
  erb :"menu-options/add-new-bookmark"
end