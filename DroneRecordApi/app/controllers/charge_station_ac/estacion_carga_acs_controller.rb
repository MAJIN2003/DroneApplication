module ChargeStationAc
  class EstacionCargaAcsController < ApplicationController
    before_action :set_estacion_carga_ac, only: %i[show update destroy]
    load_and_authorize_resource class: EstacionCargaAc

    def index
      data = EstacionCargaAc.all

      render json: data
    end

    def show
      render json: @estacion_carga_ac
    end

    def create
      @estacion_carga_ac = EstacionCargaAc.new(estacion_carga_ac_params)

      if @estacion_carga_ac.save
        render json: @estacion_carga_ac, status: :created
      else
        render json: @estacion_carga_ac.errors, status: :unprocessable_entity
      end
    end

    def update
      if @estacion_carga_ac.update(estacion_carga_ac_params)
        render json: @estacion_carga_ac
      else
        render json: @estacion_carga_ac.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @estacion_carga_ac.destroy!
    end

    private

    def set_estacion_carga_ac
      @estacion_carga_ac = EstacionCargaAc.find(params[:id])
    end

    def estacion_carga_ac_params
      params.require(:estacion_carga_ac).permit(:fecha_registro, :corriente_ac, :potencia_ac)
    end
  end
end
