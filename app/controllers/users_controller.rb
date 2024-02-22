class UsersController < ApplicationController
  protect_from_forgery
  def index
    user = User.select('users.*, user_authorities.name')
      .joins('LEFT JOIN user_authorities ON users.authority = user_authorities.auth_num')
      render :json => {
        data:       user,
        status:     :accepted
      }
  end
  def update
    if User.where(login_id: params[:login_id]).update_all(
      user_name:                params[:user_name],
      email:                    params[:email],
      authority:                params[:authority], 
      )
    render :json => {
        status: :accepted
      }
    end
  end
  def change_password
    userId = params[:login_id]
    current_password = params[:current_password]
    new_password = params[:new_password]

    # Perform validation on the user_id, current_password, and new_password
    # ...

    # Find the user by user_id and update the password
    user = User.find_by(login_id: userId)
    if user && user.authenticate(current_password)
      user.update(password: new_password)
      render json: { message: 'Password changed successfully' }
    else
      render json: { error: 'Invalid user or password' }, status: :unprocessable_entity
    end
  end
end