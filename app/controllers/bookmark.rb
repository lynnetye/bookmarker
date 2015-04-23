#----------- A SINGLE USER'S BOOKMARKS -----------

get '/bookmarks' do
  @section = "your-bookmarks"
  erb :"_user-homepage"
end

post '/bookmarks' do
  name = params[:name]
  url = params[:url]
  @bookmark = Bookmark.create!({
    name: name,
    url: url
  })
  current_user.bookmarks << @bookmark
  current_user.save!
  redirect '/bookmarks'
  # content_type :json
  # {name: name, url: url}.to_json
end

get '/bookmarks/:id/edit' do
  @bookmark = Bookmark.where(id: params[:id]).first
  erb :"_user-homepage"
end

put '/bookmarks/:id' do
  @bookmarks = users_bookmarks
  @bookmark = @bookmarks.where(id: params[:id]).first
  @bookmark.update(
    name: params[:name],
    url: params[:url]
  )
  redirect '/bookmarks'
end

delete '/bookmarks/:id' do
  @bookmarks = users_bookmarks
  @bookmark = @bookmarks.where(id: params[:id]).first

  @bookmark.destroy
  redirect '/bookmarks'
end