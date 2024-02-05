class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :login_id
      t.string :password
      t.string :password_digest
      t.integer :authority

      t.timestamps
    end
  end
end
