class ApplicationController < ActionController::Base
  protect_from_forgery 
  def render_resource(resource)
      if resource.errors.empty?
        render json: resource
      else
        validation_error(resource)
      end
    end

    def validation_error(resource)
      render json: {
        errors: [
        {
            status: '400',
            title: 'Bad Request',
            detail: resource.errors,
            code: '100'
        }
        ]
      }, status: :bad_request
    end
  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
  def current_user
    @current_user
  end
end
