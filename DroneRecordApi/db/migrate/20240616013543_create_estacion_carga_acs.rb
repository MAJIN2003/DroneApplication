class CreateEstacionCargaAcs < ActiveRecord::Migration[7.1]
  def self.up
    create_table :estaciones_carga_ac do |t|
      t.datetime :fecha_registro, null: false
      t.float    :corrienteAC,    null: false
      t.float    :potenciaAC,     null: false

      t.references :uav, null: false, foreign_key: true
    end
  end

  def self.down
    drop_table :estaciones_carga_ac
  end
end
