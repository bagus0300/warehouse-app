class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  class AuthenticationError < StandardError; end
  
  rescue_from ActiveRecord::RecordInvalid, with: :render_422
  rescue_from AuthenticationError, with: :not_authenticated
  before_action :configure_permitted_parameters, if: :devise_controller?

  def authenticate
    raise AuthenticationError unless current_user
  end

  def current_user
    @current_user ||= Jwt::UserAuthenticator.call(request.headers)
  end

  private

  def render_422(exception)
    render json: { error: { messages: exception.record.errors.full_messages } }, status: :unprocessable_entity
  end

  def not_authenticated
    render json: { error: { messages: ['please login'] } }, status: :unauthorized
  end

  protected

  def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(:login_id, :password)}
        devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:user_name, :login_id, :email, :password)}

        devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:user_name, :login_id, :email, :authority, :password, :current_password)}
  end
  
end
