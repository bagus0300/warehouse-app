class UserController < ApplicationController
  protect_from_forgery
  def index
    user = User.all
    render :json => {
      data:       user,
      status:     :accepted
    }
  end
  def update
    if User.where(id: params[:id]).update_all(
      user_name:                params[:user_name],
      login_id:                 params[:login_id],
      email:                    params[:email],
      authority:                params[:authority],
      )
    render :json => {
        status: :accepted
      }
    end
  end
end
