require 'faker'

# create example users

# master = User.create!({
#   name: "Master User",
#   email: "master@user.com",
#   password: "asdfhjkl"
# })

# creator = User.create!({
#   name: "Creator User",
#   email: "creator@user.com",
#   password: "asdfhjkl"
# })

# admirer = User.create!({
#   name: "Admirer User",
#   email: "admirer@user.com",
#   password: "asdfhjkl"
# })

# facebook = Bookmark.create({
#   name: "Facebook",
#   url: "https://www.facebook.com"
# })

# twitter = Bookmark.create({
#   name: "Twitter",
#   url: "https://www.twitter.com"
# })

# master.bookmarks << facebook
# master.save!
# master.bookmarks << twitter
# master.save!


20.times do
  User.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: 'asdfhjkl'
  )
end

User.all.each do |user|
  100.times do
    user.bookmarks << Bookmark.new(
      name: Faker::Lorem.word,
      url: Faker::Internet.url
    )
  end
end

all_users = User.all
all_bookmarks = Bookmark.all

User.all.each_with_index do |user, index|
  user.admirers << all_users[index - 1]
  user.admirers << all_users[index - 2]
  user.admirers << all_users[index - 3]
  user.creators << all_users[index - 4]
  user.creators << all_users[index - 5]
  user.creators << all_users[index - 6]
end

