# frozen_string_literal: true

class CreateDeviseToUsers < ActiveRecord::Migration[7.1]
  def self.up
    create_table :users do |t|
      t.string  :username,           null: false
      t.string  :email,              null: false, default: ''
      t.string  :encrypted_password, null: false, default: ''
      t.integer :role,               null: false, default: 0
      t.string  :nombre
      t.string  :apellido
    end

    add_index :users, :email,                unique: true
    add_index :users, :username,             unique: true
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end
