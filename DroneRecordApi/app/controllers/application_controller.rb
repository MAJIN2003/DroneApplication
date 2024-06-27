class ApplicationController < ActionController::API
  before_action :authenticate_user!
  include Pagy::Backend
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActionController::RoutingError, with: :no_route_found
  rescue_from ArgumentError, with: :handle_argument_error
  rescue_from CanCan::AccessDenied, with: :unauthorized_action

  def no_route_found
    route_info = "No route matches [#{request.method}] \"#{request.original_fullpath}\""
    render json: { error: route_info }.to_json, status: :not_found, layout: false
  end

  private

  def not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def handle_argument_error(exception)
    render json: { error: "Invalid argument: #{exception.message}" }, status: :unprocessable_entity
  end

  def unauthorized_action
    render json: { error: 'You are not allowed to performance this action' }, status: :unauthorized
  end

  protected

  def filtering_params
    params.slice(:start_date, :end_date, :date, :start_time, :end_time).merge(uav_id: params[:uav_id])
  end

  def pagy_metadata(pagy)
    {
      count: pagy.count,
      page: pagy.page,
      items: pagy.items,
      pages: pagy.pages,
      next: pagy.next,
      prev: pagy.prev
    }
  end
end
