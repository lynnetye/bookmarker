require 'bcrypt'

class User < ActiveRecord::Base

  has_many :admiring_friends, foreign_key: "creator_id", class_name: "Friendship"
  has_many :admirers, through: :admiring_friends

  has_many :idols, foreign_key: "admirer_id", class_name: "Friendship"
  has_many :creators, through: :idols

  has_many :bookmarks

  # validations
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  include BCrypt

  def password
    @password ||= Password.new(password_hash) if password_hash.present?
  end

  def password=(new_password)
    return if new_password.nil? || new_password.blank?
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate(password)
    self.password == password
  end
end
