get '/bookmarks' do
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

get 'bookmarks/:id' do
end

get '/bookmarks/:id/edit' do
  @bookmark = Bookmark.where(id: params[:id]).first
  erb :"bookmarks/_your-bookmarks"
end

put '/bookmarks/:id' do
  @bookmarks = users_bookmarks
  @bookmark = Bookmark.where(id: params[:id]).first
  puts
  p @bookmark
  @bookmark.update(
    name: params[:name],
    url: params[:url]
  )
  p @bookmark
  redirect '/'
end

delete '/bookmarks/:id' do
end