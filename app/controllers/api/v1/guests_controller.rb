
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

  def confirm
    guest = Guest.where(tasting_id:params[:tasting_id], taster:current_taster).first
    if guest
      guest.confirmed = Time.current
      if guest.save
        guest.tasting.tasting_wines.each_with_index do |tw,i|
          # WineReview.create_next_in_sequence_for_guest(guest.tasting, guest.taster)
          guest.tasting.wine_reviews.create({taster_id: current_taster.id, wine_number:i+1, rating:3})
        end
        if current_taster.connections.where(host_id:guest.tasting.host_id).count==0
          current_taster.connections.create({host_id:guest.tasting.host_id, connected_at:Time.current})
        end
        GuestMailer.confirm_guest_to_host(guest).deliver
        render json: guest, serializer: guest_serializer(guest)
      else
        render json: { error: "Unknown Error saving guest", status: 400 }, status: 400
      end
    else
      render json: { error: "Guest not found for current taster or tasting", status: 400 }, status: 400
    end
  end

  def deny
    guest = Guest.where(tasting_id:params[:tasting_id], taster:current_taster).first
    if guest && guest.destroy
      GuestMailer.deny_guest_to_host(guest).deliver
      render json: guest, serializer: guest_serializer(guest)
    else
      render json: { error: "Unknown Error denying invite", status: 400 }, status: 400
    end
  end

  def includeHost
    if current_host
      guest = Guest.new({tasting_id:params[:tasting_id], taster_id:current_taster.id, confirmed:Time.current})
      if guest.save
        guest.tasting.tasting_wines.each_with_index do |tw,i|
          # WineReview.create_next_in_sequence_for_guest(guest.tasting, guest.taster)
          guest.tasting.wine_reviews.create({taster_id: current_taster.id, wine_number:i+1, rating:3})
        end
        render json: guest, serializer: Tastings::New::GuestSerializer
      else
        render json: { error: "Unknown Error saving guest", status: 400 }, status: 400
      end
    else
      render json: { error: "Host Unconfirmed", status: 403 }, status: 403
    end
  end

  def invitations
    guests = Guest.where(taster_id:current_taster.id).where(confirmed:nil)
    render json: guests, each_serializer: Tastings::New::GuestSerializer
  end

  # in order to access the invitation token in the GuestMailer
  # we have to create user, taster, and guest in one method
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
          GuestMailer.invite_new_user(guest, user.raw_invitation_token, client_timezone_str(guest.tasting.open_at, false, guest.tasting.location.time_zone)).deliver
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

  def inviteTaster
    if current_host
      taster = Taster.find(invite_taster_params[:taster_id])
      if taster
        if taster.inactive?
          render json: { error: "Taster is currently inactive", status: 403 }, status: 403
        else
          guest = Guest.new({tasting_id:invite_taster_params[:tasting_id], taster_id:taster.id})
          guest.invited = Time.current
          if guest.save
            GuestMailer.invite_taster(guest, client_timezone_str(guest.tasting.open_at, false, guest.tasting.location.time_zone)).deliver
            render json: guest, serializer: Tastings::New::GuestSerializer
          else
            render json: { error: "Unknown Error saving guest", status: 400 }, status: 400
          end
        end
      else
        render json: { error: "Unknown Error finding Taster", status: 400 }, status: 400
      end
    else
      render json: { error: "Host Unconfirmed", status: 403 }, status: 403
    end
  end

  def create
    if current_host
      guest = Guest.new(create_guest_params)
      guest.invited = Time.current
      if guest.save
        GuestMailer.invite_taster(guest, client_timezone_str(guest.tasting.open_at, false, guest.tasting.location.time_zone)).deliver
        render json: guest, serializer: Tastings::New::GuestSerializer
      else
        render json: { error: "Unknown Error saving guest", status: 400 }, status: 400
      end
    else
      render json: { error: "Host Unconfirmed", status: 403 }, status: 403
    end
  end

  # def removeHost
  #   if current_host
  #     guest = Guest.where(taster_id:current_taster.id).where(tasting_id:params[:tasting_id]).first
  #     if guest && guest.destroy
  #       guest.taster.wine_reviews.where(tasting: guest.tasting).destroy_all
  #       render json: guest, serializer: Tastings::New::GuestSerializer
  #     else
  #       render json: { error: "Unknown Error saving guest", status: 400 }, status: 400
  #     end
  #   else
  #     render json: { error: "Host Unconfirmed", status: 403 }, status: 403
  #   end
  # end

  def show
    guest = Guest.find(params[:id])
    current_guests = Guest.where(taster_id:current_taster.id, tasting_id:guest.tasting_id)
    if current_guests.count==1 || (current_host && guest.tasting.host_id==current_host.id)
      render json: guest, serializer: guest_serializer(guest)
    else
      render json: { error: "guest is not associated", status: 403 }, status: 403
    end
  end

  def destroy
    guest = Guest.find(params[:id])
    if current_taster==guest.taster || (current_host && guest.tasting.host==current_host)
      guest.taster.wine_reviews.where(tasting: guest.tasting).destroy_all
      if guest.destroy
        if current_host && guest.tasting.host==current_host && current_taster!=guest.taster
          GuestMailer.remove_guest_from_host(guest).deliver
        elsif !current_host || current_host.taster!=current_taster
          GuestMailer.remove_guest_to_host(guest).deliver
        end
        render json: guest, serializer: Tastings::New::GuestSerializer
      else
        render json: { error: "Unknown Error deleting guest", status: 400 }, status: 400
      end
    else
      render json: { error: "Current taster not associated with guest", status: 403 }, status: 403
    end
  end


  private

  def create_guest_params
    params.require(:guest).permit(:tasting_id, :taster_id)
  end

  def invite_new_params
    params.permit(:email, :tasting_id)
  end

  def invite_taster_params
    params.permit(:tasting_id, :taster_id)
  end

  def guest_serializer(guest)
    return Tastings::Show::Open::GuestSerializer if guest.tasting.is_open?
    ::GuestSerializer
  end

end
