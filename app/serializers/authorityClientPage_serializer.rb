class AuthorityClientPage < ApplicationRecord
  belongs_to :authority_client_pages
  belongs_to :client_pages
end
