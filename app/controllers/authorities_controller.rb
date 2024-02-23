class AuthoritiesController < ApplicationController
  def index
    puts "................."
    render :json => {
      data: UserAuthority.all
    }
  end
end
