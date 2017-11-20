
class Api::V1::GuestsController < Api::BaseController

  # def showByEmail
  #   if current_host
  #     email = params[:email]
  #     guest = Guest.where(taster: Taster.where(user: User.where(email: email).first).first).first
  #     if guest
  #       render json: guest, serializer: Tastings::New::GuestSerializer
  #     else
  #       render json: false
  #     end
  #   else
  #     render json: { error: "Host Unconfirmed", status: 403 }, status: 403
  #   end
  # end

  def inviteNewUser
    if current_host
      user = User.invite!({email: invite_new_params[:email]}) do |u|
        u.skip_invitation = true
        u.invited_by_id = current_user.id
      end
      taster = Taster.new(user:user)
      if taster.save
        guest = Guest.new({tasting_id:invite_new_params[:tasting_id], taster_id:taster.id})
        guest.invited = Time.current
        if guest.save
          GuestMailer.invite_new_user(guest, user.raw_invitation_token).deliver
          render json: guest, serializer: Tastings::New::GuestSerializer
        else
          render json: { error: "Unknown Error saving guest", status: 400 }, status: 400
        end
      else
        render json: { error: "Unknown Error saving taster", status: 400 }, status: 400
      end
    else
      render json: { error: "Host Unconfirmed", status: 403 }, status: 403
    end
  end


  private

  def create_guest_params
    params.require(:guest).permit(:tasting_id, :taster_id)
  end

  def invite_new_params
    params.permit(:email, :tasting_id)
  end
end
