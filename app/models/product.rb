class Product < ApplicationRecord
  belongs_to :warehouse_fee

  validates :warehouse_fee, presence: true
end