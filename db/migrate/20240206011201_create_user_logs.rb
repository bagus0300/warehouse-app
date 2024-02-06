class CreateUserLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :user_logs do |t|
      t.string :login_id
      t.string :login_ip
      t.string :user_agent
      t.string :login_status

      t.timestamps
    end
  end
end
