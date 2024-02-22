class Users::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
  respond_to :json
  
  private
  def respond_with(resource, _opts = {})
    if resource.persisted? # Check if the user was saved correctly (no validation errors)

      user_data = UserSerializer.new(resource).serializable_hash[:data][:attributes]
     
      authority_client_pages = User.joins(user_authority: { authority_client_pages: :client_page })
                          .where(users: { id: resource.id })
                          .select('authority_client_pages.client_page_id, 
                                    authority_client_pages.is_edit, 
                                    authority_client_pages.is_read, 
                                    client_pages.path')

      render json: {
        status: {code: 200, message: 'Logged in sucessfully.'},
        data: user_data.merge,
        authority_client_pages: authority_client_pages
      }, status: :ok
    else
      validation_error(resource)
    end
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

end
