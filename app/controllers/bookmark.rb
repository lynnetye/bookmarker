get '/bookmarks/new' do

end

post '/bookmarks' do
  p params
  @bookmark = Bookmark.new({
    name: params[:name],
    url: params[:url]
    })
  content_type :json
  {name: params[:name], url: params[:url]}.to_json
end