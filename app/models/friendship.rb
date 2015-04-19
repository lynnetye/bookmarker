class Friendship < ActiveRecord::Base
  belongs_to :creator, class_name: "User"
  belongs_to :admirer, class_name: "User"
end