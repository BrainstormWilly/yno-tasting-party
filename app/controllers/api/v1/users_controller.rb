class Api::V1::UsersController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken

  def showByEmail
    if current_host
      user = User.find_by(email: params[:email])
      if user
        render json: true
      else
        render json: nil
      end
    elsif current_user
      render json: { error: "User searches only allowed by registered hosts.", status: 403 }, status: 403
    else
      render json: { error: "Unauthorized user.", status: 401 }, status: 401
    end
  end

  def acceptInvitation
    if current_user
      render json: { error: "User already logged into system.", status: 400 }, status: 400
    else
      user = User.accept_invitation!(invitation_token:params[:invitation_token], password:valid_user_params[:password])
      if user.invitation_accepted_at
        render json: user, serializer: Tasters::Invites::UserSerializer
      else
        render json: { error: "Unable to accept invitation.", status: 400 }, status: 400
      end
    end
  end

  def resetUserPassword
    user = User.reset_password_by_token(valid_reset_password_params)
    render json: user, serializer: Users::UserSerializer
  end

  def show
    user = User.find(params[:id])
    if current_user
      if current_user==user
        render json: current_user, serializer: Users::UserSerializer
      else
        render json: { error: "Forbidden user access.", status: 403 }, status: 403
      end
    else
      render json: { error: "No user unauthorized.", status: 401 }, status: 401
    end
  end

  # def update
  #   if current_user
  #     user = User.find(params[:id])
  #     if current_user==user
  #       if user.update(valid_user_params)
  #         bypass_sign_
  #     end
  #   else
  #     render json: { error: "No user unauthorized.", status: 401 }, status: 401
  #   end
  # end


  # def showByToken
  #   if current_user
  #     render json: { error: "Already logged in as another user", status: 400 }, status: 400
  #   else
  #     user = User.find_by_invitation_token(params[:invitation_token])
  #     if user
  #       render json: user, serializer: UserSerializer
  #     else
  #       render json: { error: "Unable to find user's token", status: 400 }, status: 400
  #     end
  #   end
  # end


  private

    def valid_user_params
      params.require(:user).permit(:password, :password_confirmation, :email)
    end

    def valid_reset_password_params
      params.require(:user).permit(:password, :password_confirmation, :reset_password_token)
    end

end
