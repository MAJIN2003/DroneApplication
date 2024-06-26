class EstacionCargaDc < ApplicationRecord
  belongs_to :uav

  self.table_name = "estaciones_carga_dc"
end
