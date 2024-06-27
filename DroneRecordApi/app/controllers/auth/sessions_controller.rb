# frozen_string_literal: true

class Auth::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(current_user, _opts = {})
    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        data: { user: UserSerializer.new.serialize(current_user) }
      }
    }
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last,
                               Rails.application.credentials.fetch(:secret_key_base)).first
      current_user = User.find(jwt_payload['sub'])
    end

    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }
    end
  end
end
