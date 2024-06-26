class AcChargeStationSerializer < Panko::Serializer
  attributes :id,
             :fecha_registro,
             :corrienteAC,
             :potenciaAC
end 