class CreatePanelSolars < ActiveRecord::Migration[7.1]
  def self.up
    create_table :paneles_solares do |t|
      t.datetime :fecha_registro, null: false
      t.float    :Vp,             null: false
      t.float    :Cp,             null: false
      t.float    :Vb,             null: false
      t.float    :Cb,             null: false
      t.float    :Vc,             null: false
      t.float    :Cc,             null: false

      t.references :uav, null: false, foreign_key: true
    end
  end

  def self.down
    drop_table :paneles_solares
  end
end
