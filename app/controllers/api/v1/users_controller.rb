class Api::V1::UsersController < Api::BaseController

  def showByEmail
    if current_host || current_user.email==params[:email]
      user = User.find_by(email: params[:email])
      if user
        render json: user, serializer: UserSerializer
      else
        render json: nil
      end
    else
      render json: { error: "Host Unconfirmed.", status: 403 }, status: 403
    end
  end

  def invite
    if current_host
      user = User.invite!({email: params[:user][:email]}) do |u|
        u.skip_invitation = true
        u.invited_by_id = current_user.id
      end
      if user
        render json: user, serializer: UserSerializer
      else
        render json: { error: "Unknown Error.", status: 400 }, status: 400
      end
    else
      render json: { error: "Host Unconfirmed.", status: 403 }, status: 403
    end
  end

end
