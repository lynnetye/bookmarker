require 'faker'

# create example users

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
      url: Faker::Internet.url,
      image: Faker::Avatar.image("slug", "50x50", "jpg")
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

