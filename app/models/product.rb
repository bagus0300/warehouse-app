class Product < ApplicationRecord
  belongs_to :warehouse_fee
  has_many   :stock

  validates :warehouse_fee, presence: true
end