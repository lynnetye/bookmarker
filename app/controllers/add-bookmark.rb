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