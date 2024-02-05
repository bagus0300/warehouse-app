class Api::SecssionController < ApplicationController
    # skip_before_action :authorized, only: [:login]
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

    def create 
        user = User.find_by!(user_name: login_params[:user_name])
        if user.authenticate(login_params[:password])
            token = encode_token(user_id: user.id)
            render json: {
                user: UserSerializer.new(user),
                token: token
            }, status: :accepted
        else
            render json: {message: 'Incorrect password'}, status: :unauthorized
        end

    end

    def destroy
        puts "session destroy"
    end

    private 

    def login_params 
        params.permit(:user_name, :password)
    end

    def handle_record_not_found(e)
        render json: { message: "User doesn't exist" }, status: :unauthorized
    end
end
