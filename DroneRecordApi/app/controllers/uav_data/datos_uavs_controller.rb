module UavData
  class DatosUavsController < ApplicationController
    before_action :set_datos_uav, only: %i[show update destroy]
    load_and_authorize_resource class: DatosUav

    def index
      data = DatosUav.all

      render json: data
    end

    def show
      render json: @datos_uav
    end

    def create
      @datos_uav = DatosUav.new(datos_uav_params)

      if @datos_uav.save
        render json: @datos_uav, status: :created
      else
        render json: @datos_uav.errors, status: :unprocessable_entity
      end
    end

    def update
      if @datos_uav.update(datos_uav_params)
        render json: @datos_uav
      else
        render json: @datos_uav.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @datos_uav.destroy!
    end

    private

    def set_datos_uav
      @datos_uav = DatosUav.find(params[:id])
    end

    def datos_uav_params
      params.require(:datos_uav).permit(:fecha_registro, :voltaje, :porcentaje_bateria, :corriente, :modo_vuelo,
                                        :velocidad, :altitud, :latitud, :longitud, :uav_id)
    end
  end
end
