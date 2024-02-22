class UserAuthority < ApplicationRecord
  has_many :authority_client_pages, foreign_key: :user_authority_id
end
