module SolarPanel
  class DayFilteringController < ApplicationController
    load_and_authorize_resource class: PanelSolar

    def index
      datos_uav = PanelSolar.all
      context = FilteringContext.new(datos_uav, :day, filtering_params)

      if filtering_params[:start_time].present? && filtering_params[:end_time].present?

        pagy, datos_uav = pagy(context.filter, items: 5)

        response = {
          data: datos_uav,
          pagination: pagy_metadata(pagy)
        }

        render json: response
      else
        datos_uav = context.filter
        render json: {
          data: datos_uav
        }
      end
    end
  end
end
