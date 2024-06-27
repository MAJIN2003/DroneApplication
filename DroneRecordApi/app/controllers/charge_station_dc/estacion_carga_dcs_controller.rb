module ChargeStationDc
  class EstacionCargaDcsController < ApplicationController
    before_action :set_estacion_carga_dc, only: %i[show update destroy]
    load_and_authorize_resource class: EstacionCargaDc

    def index
      data = EstacionCargaDc.all

      render json: data
    end

    def show
      render json: @estacion_carga_dc
    end

    def create
      @estacion_carga_dc = EstacionCargaDc.new(estacion_carga_dc_params)

      if @estacion_carga_dc.save
        render json: @estacion_carga_dc, status: :created
      else
        render json: @estacion_carga_dc.errors, status: :unprocessable_entity
      end
    end

    def update
      if @estacion_carga_dc.update(estacion_carga_dc_params)
        render json: @estacion_carga_dc
      else
        render json: @estacion_carga_dc.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @estacion_carga_dc.destroy!
    end

    def set_estacion_carga_dc
      @estacion_carga_dc = EstacionCargaDc.find(params[:id])
    end

    def estacion_carga_dc_params
      params.require(:estacion_carga_dc).permit(:fecha_registro, :corriente_dc, :potencia_dc)
    end
  end
end
