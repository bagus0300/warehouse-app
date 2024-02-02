class Api::UserController < ApplicationController
  def index
  end
  def check
    render json: { :things => [
      {
        :name => 'asdfsdaf',
        :guid => '000000-000000000-0000000-00000000'
      }
    ]}.to_json
    # @user = User.find_by_username(params[:auth][:username])
    # if @user.password == params[:auth][:password]
  end
end
