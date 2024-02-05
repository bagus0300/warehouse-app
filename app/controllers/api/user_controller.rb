class Api::UserController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
  end
  def login
    @username = params[:username]
    @password = params[:password]

    
    @user = User.find_by(username: params[:username])
    if @user 
    render json: { :things => [
      {
        :name => params[:username],
        :status => 'valid user'
      }
    ]}.to_json
    else
      render json: { :things => [
        {
          :name => params[:username],
          :status => 'invalid user'
        }
      ]}.to_json
    end
    
    # @user = User.find_by_username(params[:auth][:username])
    # if @user.password == params[:auth][:password]
  end
end
