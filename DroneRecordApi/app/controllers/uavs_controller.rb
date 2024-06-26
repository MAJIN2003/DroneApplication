class UavsController < ApplicationController
  before_action :set_uav, only: %i[show update destroy]
  load_and_authorize_resource class: Uav

  def index
    pagy, uavs = pagy(Uav.all) if current_user.admin?

    pagy, uavs = pagy(Uav.where(user_id: current_user)) if current_user.user?

    serializerd_uavs = uavs.map do |uav|
      UavSerializer.new.serialize(uav)
    end

    response = {
      data: serializerd_uavs,
      pagination: pagy_metadata(pagy)
    }

    render json: response
  end

  def show
    # render json: UavSerializer.new.serialize(@uav)
    render json: @uav
  end

  def create
    @uav = Uav.new(uav_params)

    if @uav.save
      render json: @uav, status: :created
    else
      render json: @uav.errors, status: :unprocessable_entity
    end
  end

  def update
    if @uav.update(uav_params)
      render json: @uav
    else
      render json: @uav.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @uav.destroy!
  end

  private

  def set_uav
    @uav = Uav.find(params[:id])
  end

  def uav_params
    params.require(:uav).permit(:nombre, :descripcion, :numero_serie, :tipo_dron, :capacidad_bateria, :tipo_placa,
                                :max_viento_vuelo, :user_id)
  end
end
