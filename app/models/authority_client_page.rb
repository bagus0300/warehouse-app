class AuthorityClientPage < ApplicationRecord
  belongs_to :user_authority, foreign_key: :user_authority_id
  belongs_to :client_page
end
