class CreateClientPages < ActiveRecord::Migration[7.1]
  def change
    create_table :client_pages do |t|
      t.string :name
      t.string :path
      t.string :code_name
      t.integer :parent_id

      t.timestamps
    end
  end
end
