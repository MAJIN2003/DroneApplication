class PanelSolar < ApplicationRecord
  belongs_to :uav

  self.table_name = 'paneles_solares'
end
