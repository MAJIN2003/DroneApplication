module ChargeStationDc
  class PersonalizedFilteringController < ApplicationController
    load_and_authorize_resource class: EstacionCargaDc

    def index
      datos_uav = EstacionCargaDc.all
      context = FilteringContext.new(datos_uav, :personalized, filtering_params)
      pagy, datos_uav = pagy(context.filter)

      response = {
        data: datos_uav,
        pagination: pagy_metadata(pagy)
      }

      render json: response
    end
  end
end
