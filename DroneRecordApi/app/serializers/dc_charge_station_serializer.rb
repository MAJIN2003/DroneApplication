class DcChargeStationSerializer < Panko::Serializer
  attributes :id,
             :fecha_registro,
             :corrienteDC,
             :potenciaDC
end