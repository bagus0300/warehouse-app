# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
  after_action :log_failed_login, :only => :new
  # before_action :configure_sign_in_params, only: [:create]
 
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  respond_to :json
  ######override#########
  # def new
  #   super
  # end
  # def create
  #   puts "-------------------"
  #   puts "-------------------"
  #   self.resource = warden.authenticate!(auth_options)
  #   set_flash_message(:notice, :signed_in) if is_navigational_format?
  #   sign_in(resource_name, resource)
  #   if !session[:return_to].blank?
  #     redirect_to session[:return_to]
  #     session[:return_to] = nil
  #   else
  #     respond_with resource, :location => after_sign_in_path_for(resource)
  #   end
  # end
  #######################

  # def create
  #   super
  #   ::Rails.logger.info "\n***\nSuccessful login with email_id : #{request.filtered_parameters["user"]}\n***\n"
  # end
  private
  def respond_with(resource, _opts = {})
    # UserLog.create(
    #   user_id:   
    # )
    render json: {
      status: {code: 200, message: 'Logged in sucessfully.'},
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
  # def log_failed_login
  #   ::Rails.logger.info "\n***\nFailed login with email_id : #{request.filtered_parameters["login_id"]}\n***\n" if failed_login?
  # end 

  # def failed_login?
  #   (options = env["warden.options"]) && options[:action] == "unauthenticated"
  # end 
end
