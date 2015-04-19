require 'faker'

# create a few users

#TODO: Once you have implemented BCrypt - you can use these to seed your database.


# User.create :name => 'Dev Bootcamp Student', :email => 'me@example.com', :password => 'password'
# 5.times do
#   User.create :name => Faker::Name.name, :email => Faker::Internet.email, :password => 'password'
# end

me = User.create!({
  name: "Master User",
  email: "master@user.com",
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

me.bookmarks << facebook
me.bookmarks << twitter