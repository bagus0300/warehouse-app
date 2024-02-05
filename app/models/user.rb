class User < ApplicationRecord
  has_secure_password
  validates :user_name, presence: true
  # validates :user_name, presence: {message: "Last  name is empty"}
  validates :login_id, uniqueness: {message: "This email is already registered."}
end
