class Uav < ApplicationRecord
  belongs_to :user
  has_many :panel_solar, dependent: :destroy
  has_many :estacion_carga_ac, dependent: :destroy
  has_many :estacion_carga_dc, dependent: :destroy
  has_many :datos_uav, dependent: :destroy

  enum tipo_dron: { multirotor: 0, ala_fija: 1 }
  enum tipo_placa: { arduino: 0, berrypi: 1 }
end
