# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
    
    def create
        build_resource(sign_up_params)
        resource.save
        render_resource(resource)
    end

    private
    
    def sign_up_params
        params.permit(:email, :user_name, :login_id, :password)
    end
end
