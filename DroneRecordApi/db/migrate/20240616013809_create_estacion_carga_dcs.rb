class CreateEstacionCargaDcs < ActiveRecord::Migration[7.1]
  def self.up
    create_table :estaciones_carga_dc do |t|
      t.datetime :fecha_registro, null: false
      t.float    :corrienteDC,    null: false
      t.float    :potenciaDC,     null: false

      t.references :uav, null: false, foreign_key: true
    end
  end

  def self.down
    drop_table :estaciones_carga_dc
  end
end
