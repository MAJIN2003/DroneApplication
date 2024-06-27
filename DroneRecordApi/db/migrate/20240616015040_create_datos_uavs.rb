class CreateDatosUavs < ActiveRecord::Migration[7.1]
  def self.up
    create_table :datos_uavs do |t|
      t.datetime :fecha_registro,     null: false
      t.float    :voltaje,            null: false
      t.float    :porcentaje_bateria, null: false
      t.float    :corriente,          null: false
      t.string   :modo_vuelo,         null: false
      t.float    :velocidad,          null: false
      t.float    :altitud,            null: false
      t.float    :latitud,            null: false
      t.float    :longitud,           null: false

      t.references :uav, null: false, foreign_key: true
    end
  end

  def self.down
    drop_table :datos_uavs
  end
end
