class CreateAuthorityClientPages < ActiveRecord::Migration[7.1]
  def change
    create_table :authority_client_pages do |t|
      t.integer :user_authority_id
      t.integer :client_page_id
      t.boolean :is_edit

      t.timestamps
    end
  end
end
