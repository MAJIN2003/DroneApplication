class SolarPanelSerializer < Panko::Serializer
  attributes :id,
             :fecha_registro,
             :Vp,
             :Cp,
             :Vb,
             :Cb,
             :Vc,
             :Cc
end
