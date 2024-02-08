class Api::UsersController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    user = User.new(user_params)
    if user.save
      # @token = encode_token(user_id: user.id)
      token = Jwt::TokenProvider.call(user_id: user.id)
      render json: {
        user: UserSerializer.new(user),
        token: token
      }, status: :accepted
    else
      render json: {errors: user.errors}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:user_name, :login_id, :password)
  end
end
