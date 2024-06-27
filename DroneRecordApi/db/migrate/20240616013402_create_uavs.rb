class CreateUavs < ActiveRecord::Migration[7.1]
  def change
    create_table :uavs do |t|
      t.string  :nombre
      t.string  :descripcion
      t.string  :numero_serie
      t.integer :tipo_dron
      t.float   :capacidad_bateria
      t.integer :tipo_placa
      t.float   :max_viento_vuelo

      t.references :user, null: false, foreign_key: true
    end
  end

  def self.down
    drop_table :uavs
  end
end
