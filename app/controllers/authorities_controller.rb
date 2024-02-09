class AuthoritiesController < ApplicationController
  def index
    render :json => {
      data: UserAuthority.all
    }
  end
end
