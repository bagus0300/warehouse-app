class CreateUserAuthorities < ActiveRecord::Migration[7.1]
  def change
    create_table :user_authorities do |t|
      t.string :name
      t.integer :auth_num

      t.timestamps
    end
  end
end
