class AuthorityClientPagesController < ApplicationController
  def index
    authorityClientPage = AuthorityClientPage.select('*')
      .joins('LEFT JOIN client_pages ON authority_client_pages.user_authority_id = client_pages.id')
      render :json => {
        data:       authorityClientPage,
        status:     :accepted
      }
  end
  def create

  end
  def update

  end
  def destroy

  end
  def create_or_update
    params[:_json].each do |params|
      authority_client_pages = AuthorityClientPage.find_or_initialize_by(
        user_authority_id: params[:user_authority_id],
        client_page_id: params[:client_page_id]
      )
      authority_client_pages.is_edit = params[:is_edit]
      authority_client_pages.is_read = params[:is_read]
      authority_client_pages.save!
    end
    
      render json: { message: 'Authority client page data saved successfully' }
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

  private

  def authority_client_page_params
    params.require(:authority_client_pages).map do |authority_client_pages|
      authority_client_pages.permit(:user_authority_id, :client_page_id, :is_edit, :is_read)
    end
  end
end
