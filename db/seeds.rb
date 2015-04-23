# require 'faker'

# create a few users

#TODO: Once you have implemented BCrypt - you can use these to seed your database.


master = User.create!({
  name: "Master User",
  email: "master@user.com",
  password: "asdfhjkl"
})

creator = User.create!({
  name: "Creator User",
  email: "creator@user.com",
  password: "asdfhjkl"
})

admirer = User.create!({
  name: "Admirer User",
  email: "admirer@user.com",
  password: "asdfhjkl"
})

facebook = Bookmark.create({
  name: "Facebook",
  url: "https://www.facebook.com"
})

twitter = Bookmark.create({
  name: "Twitter",
  url: "https://www.twitter.com"
})

master.bookmarks << facebook
master.bookmarks << twitter
