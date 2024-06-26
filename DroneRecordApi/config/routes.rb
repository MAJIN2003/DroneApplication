Rails.application.routes.draw do
  devise_for :users,
             path: 'auth', path_names: {
                             sign_in: 'login',
                             sign_out: 'logout',
                             registration: 'signup'
                           },
             controllers: {
               sessions: 'auth/sessions',
               registrations: 'auth/registrations'
             }

  resources :users, only: :index

  namespace :solar_panel, path: 'solar_panels', as: :solar_panels do
    get '/', to: 'solar_panels#index'
    get 'filter_by_week(/:uav_id)', to: 'week_filtering#index'
    get 'filter_by_month(/:uav_id)', to: 'month_filtering#index'
    get 'filter_by_day(/:uav_id)', to: 'day_filtering#index'
    get 'current(/:uav_id)', to: 'current_filtering#index'
    get 'personalized_info(/:uav_id)', to: 'personalized_filtering#index'
  end

  namespace :uav_data, path: 'datos_uavs', as: :datos_uavs do
    get '/', to: 'datos_uavs#index'
    get 'filter_by_week(/:uav_id)', to: 'week_filtering#index'
    get 'filter_by_month(/:uav_id)', to: 'month_filtering#index'
    get 'filter_by_day(/:uav_id)', to: 'day_filtering#index'
    get 'current(/:uav_id)', to: 'current_filtering#index'
    get 'personalized_info(/:uav_id)', to: 'personalized_filtering#index'
  end

  namespace :charge_station_ac, path: 'estacion_carga_acs', as: :estacion_carga_acs do
    get '/', to: 'estacion_carga_acs#index'
    get 'filter_by_week(/:uav_id)', to: 'week_filtering#index'
    get 'filter_by_month(/:uav_id)', to: 'month_filtering#index'
    get 'filter_by_day(/:uav_id)', to: 'day_filtering#index'
    get 'current(/:uav_id)', to: 'current_filtering#index'
    get 'personalized_info(/:uav_id)', to: 'personalized_filtering#index'
  end

  namespace :charge_station_dc, path: 'estacion_carga_dcs', as: :estacion_carga_dcs do
    get '/', to: 'estacion_carga_dcs#index'
    get 'filter_by_week(/:uav_id)', to: 'week_filtering#index'
    get 'filter_by_month(/:uav_id)', to: 'month_filtering#index'
    get 'filter_by_day(/:uav_id)', to: 'day_filtering#index'
    get 'current(/:uav_id)', to: 'current_filtering#index'
    get 'personalized_info(/:uav_id)', to: 'personalized_filtering#index'
  end

  resources :uavs

  match '*unmatched', to: 'application#no_route_found', via: :all
end
