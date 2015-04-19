require 'bcrypt'

class User < ActiveRecord::Base
  #TODO : Use bcrypt to store hashed passwords and authenticate users
  validates :name, presence: true
  validates :email, presence: true
  validates :password, presence: true

  # def password
  # end

  # def password=(password)
  #   password
  #   self.password_hash =
  # end

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
