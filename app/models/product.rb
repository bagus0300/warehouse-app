class Product < ApplicationRecord
  belongs_to :unit_price

  validates :unit_price, presence: true
end