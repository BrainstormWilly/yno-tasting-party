class GuestsController < ApplicationController

  before_action :authenticate_user!

  # def update
  #   @guest = Guest.find(params[:id])
  #   if @guest.update(valid_params)
  #     flash[:notice] = "Yay! You are confirmed for this tasting"
  #     redirect_to tasting_path(@guest.tasting_id)
  #   else
  #     flash[:alert] = "Sorry, we were unable to confirm you for tasting #{@guest.tasting.name}. Please notify your host."
  #     redirect_to edit_taster_path(@guest.taster_id)
  #   end
  # end


  # GET /tasting/:tasting_id/guests/new
  def new
    @tasters = Taster.all
    @guest= Guest.new
    @user = User.new
    @tasting = Tasting.find(params[:tasting_id])
  end

  # POST /guest
  def create
    @guest = Guest.new(valid_params)
    if @guest.save
      WineReview.create_all_for_guest(@guest.tasting, @guest.taster)
      flash[:notice] = "Taster successfully added to tasting."
      redirect_to edit_tasting_path(@guest.tasting)
    else
      flash[:alert] = "There was an error adding taster to tasting. Please try again later."
      redirect_to edit_tasting_path(@guest.tasting)
    end
  end

  # PUT /guests/:id
  def confirm
    @guest = Guest.find(params[:id])
    @guest.confirmed = Time.current
    if @guest.save
      WineReview.create_all_for_guest(@guest.tasting, @guest.taster)
      flash[:notice] = "Yay! You are confirmed for this tasting"
      redirect_to tasting_path(@guest.tasting_id)
    else
      flash[:alert] = "Sorry, we were unable to confirm you for tasting #{@guest.tasting.name}. Please notify your host."
      redirect_to authenticated_root_path
    end
  end

  # PUT /tastings/:tasting_id/guests/create_and_confirm/:taster_id
  def create_and_confirm
    @tasting = Tasting.find(params[:tasting_id])
    @taster = Taster.find(params[:taster_id])
    @guest = Guest.new({
      tasting_id: @tasting.id,
      taster_id: @taster.id,
      confirmed: Time.current,
      invited: Time.current})
    if @guest.save
      WineReview.create_all_for_guest(@tasting, @taster)
      flash[:notice] = "Taster #{@taster.name} successfully added to tasting."
      redirect_to edit_tasting_path(@tasting)
    else
      flash[:alert] = "Unable to add taster to tasting. Please try again later."
      redirect_to new_tasting_guest_path(@tasting)
    end
  end

  # DELETE /guests/:id
  def destroy
    @guest = Guest.find(params[:id])
    if @guest.destroy
      WineReview.delete_all_for_guest(@guest.tasting, @guest.taster)
      if current_host
        if @guest.taster == current_host.taster
          flash[:notice] = "You have been successfully removed from tasting."
        else
          flash[:notice] = "#{@guest.taster.name} been successfully removed from tasting."
        end
        redirect_to edit_tasting_path(@guest.tasting)
      else
        flash[:notice] = "You have been successfully removed from tasting."
        redirect_to tasting_path(@guest.tasting)
      end
    else
      flash[:alert] = "There was an error deleting taster. Please try again later."
      if current_host
        redirect_to edit_tasting_path(@guest.tasting)
      else
        redirect_to tasting_path(@guest.tasting)
      end
    end
  end

  # PUT tastings/:tasting_id/guests/existing_invite/:taster_id
  def existing_invite
    @tasting = Tasting.find(params[:tasting_id])
    @taster = Taster.find(params[:taster_id])
    @guest = Guest.new
    @guest.tasting = @tasting
    @guest.taster = @taster
    @guest.invited = Time.current
    if @guest.save

      TasterMailer.invite_taster(@guest, client_timezone_str(@tasting.open_at)).deliver
      flash[:notice] = "Invite successfully sent to #{@taster.name}."
      redirect_to tasting_guests_new_path(@tasting)
    else
      flash[:alert] = "Could not invite taster. Please try again later."
      redirect_to tasting_guests_new_path(@tasting)
    end
  end

  # POST tastings/:tasting_id/guests/new_invite
  def new_invite
    @tasting = Tasting.find(params[:tasting_id])
    @user = User.invite!({email: params[:user][:email]}) do |u|
      u.skip_invitation = true
      u.invited_by_id = current_user.id
    end
    @taster = Taster.new
    @guest = Guest.new
    if @user
      @taster.user = @user
      if @taster.save
        @guest.tasting = @tasting
        @guest.taster = @taster
        @guest.invited = Time.current
        if @guest.save
          TasterMailer.invite_new_taster(@guest, client_timezone_str(@tasting.open_at)).deliver
          flash[:notice] = "Invite successfully sent to #{@user.email}."
          redirect_to tasting_guests_new_path(@tasting)
        else
          flash[:alert] = "User invited, but unable to create taster account for tasting. Add taster after acceptance."
          redirect_to tasting_guests_new_path(@tasting)
        end
      else
        flash[:alert] = "User invited, but unable to create taster account. Add taster after acceptance."
        redirect_to tasting_guests_new_path(@tasting)
      end
    else
      flash[:alert] = "Could not invite user. Please try again later."
      redirect_to tasting_guests_new_path(@tasting)
    end
  end


  private

    def valid_params
      params.require(:guest).permit(:tasting_id, :taster_id, :invited, :confirmed)
    end

end
