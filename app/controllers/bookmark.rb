get '/bookmarks/new' do

end

post '/bookmarks' do
  name = params[:name]
  url = params[:url]
  @bookmark = Bookmark.create!({
    name: name,
    url: url
    })
  content_type :json
  {name: name, url: url}.to_json
end