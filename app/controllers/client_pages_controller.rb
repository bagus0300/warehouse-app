class ClientPagesController < ApplicationController
  def index
    render :json => {
      data: ClientPage.all,
      status: :accepted
    }
  end
end
