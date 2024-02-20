class ClientPagesController < ApplicationController
  def index
    puts "-----------------------------"
    puts "pass"
    render :json => {
      data: ClientPage.all,
      status: :accepted
    }
  end
end
