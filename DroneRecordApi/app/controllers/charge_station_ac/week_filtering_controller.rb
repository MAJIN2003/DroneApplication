module ChargeStationAc
  class WeekFilteringController < ApplicationController
    load_and_authorize_resource class: EstacionCargaAc

    def index
      datos_uav = EstacionCargaAc.all
      context = FilteringContext.new(datos_uav, :week, filtering_params)
      pagy, datos_uav = pagy(context.filter)

      response = {
        data: datos_uav,
        pagination: pagy_metadata(pagy)
      }

      render json: response
    end
  end
end
