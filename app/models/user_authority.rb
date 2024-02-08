class UserAuthority < ApplicationRecord
  has_one :AuthorityClientPage, class_name: 'AuthorityClientPage' foreign_key: 'auth_num'
end
