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
  def create_or_update
    #  x : params[:currentPassword ];
    # hashed_password: Digest::SHA256.hexdigest(x)
    # secret_number: hashed_password.to_i(16)
    # puts secret_number

  end 
end