helpers do

  def users_bookmarks
    current_user.bookmarks.all
  end

end