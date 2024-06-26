module SolarPanel
  class CurrentFilteringController < ApplicationController
    load_and_authorize_resource class: PanelSolar

    def index
      datos_uav = PanelSolar.all
      context = FilteringContext.new(datos_uav, :current, filtering_params)
      pagy, datos_uav = pagy(context.filter, items: 5)

      response = {
        data: datos_uav,
        pagination: pagy_metadata(pagy)
      }

      render json: response
    end
  end
end
