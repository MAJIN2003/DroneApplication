class UavDataSerializer < Panko::Serializer
  attributes :id,
             :fecha_registro,
             :voltaje,
             :porcentaje_bateria,
             :corriente,
             :modo_vuelo,
             :velocidad,
             :altitud,
             :latitud,
             :longitud
end