class LoginController < ApplicationController
  def index
  end
  def new
    render json: { :things => [
      {
        :name => 'some-thing',
        :guid => '000000-000000000-0000000-00000000'
      }
    ]}.to_json
  end
  def show
    
  end
  def destroy
    
  end
end
