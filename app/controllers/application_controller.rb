class ApplicationController < ActionController::Base
  # def authenticate
  #   authorization_header = request.headers[:authorization]
  #   if !authorization_header
  #     render status: :unauthorized
  #   else
  #     token = authorization_header.split(" ")[1]
  #     secret_key = Rails.application.secrets.secret_key_base[0]
  #     decoded_token = JWT.decode(token, secret_key)

  #     @user = User.find(decoded_token[0]["user_id"])
  #   end
  # end

  # def create_token(user_id)
  #   payload = {user_id: user_id}
  #   secret_key = Rails.application.secrets.secret_key_base[0]
  #   token = JWT.encode(payload, secret_key)

  #   return token
  # end
  protect_from_forgery with: :null_session
  class AuthenticationError < StandardError; end
  rescue_from ActiveRecord::RecordInvalid, with: :render_422
  rescue_from AuthenticationError, with: :not_authenticated

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
end
