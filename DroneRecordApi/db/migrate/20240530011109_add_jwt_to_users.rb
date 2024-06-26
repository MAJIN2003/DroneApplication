class AddJwtToUsers < ActiveRecord::Migration[7.1]
  def self.up
    add_column :users, :jti, :string, null: false
    add_index :users, :jti, name: 'index_users_on_jti', unique: true
  end

  def self.down
    remove_column :users, :jti
  end
end
