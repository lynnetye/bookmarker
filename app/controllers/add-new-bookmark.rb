#----------- ADD A NEW BOOKMARK -----------

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
end