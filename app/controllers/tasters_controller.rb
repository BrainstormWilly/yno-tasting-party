class TastersController < ApplicationController

  before_action :authenticate_user!
  before_action :find_taster, only: [:show, :edit, :update]


  def show
  end

  def edit
  end

  # def edit_from_invite
  # end

  def update
    @taster = Taster.find( params[:id] )
    @taster.assign_attributes( valid_params )
    if @taster.save
      redirect_to authenticated_root_path
    else
      flash.now[:alert] = 'There was an error saving your taster changes. Please try again later.'
      redirect_to edit_user_registration_path
    end
  end

  def new
    @taster = Taster.new
  end

  def create
    @taster = Taster.new(valid_params)
    @taster.user = current_user if @taster.user_id.blank?
    @taster.handle = @taster.name if @taster.handle.blank?
    if @taster.save
      flash[:notice] = "Welcome #{@taster.name}!."
      redirect_to authenticated_root_path
    else
      current_user.destroy
      flash[:alert] = 'Sorry, we were unable to sign you up. Please try again later.'
      redirect_to new_taster_path
    end
  end

  def destroy
    @taster = Taster.find( params[:id] )
    guests = Guest.where(taster: @taster)
    if guests.empty?
      if @taster.destroy
        flash[:notice] = "Taster deleted successfully"
        redirect_to authenticated_root_path
      else
        flash.now[:alert] = "There was an error deleting this taster. Please try again later."
        redirect_to edit_user_registration_path
      end
    else
      flash.now[:alert] = "You have already been a guest in a tasting. Please contact us to remove your account manually"
      redirect_to edit_user_registration_path
    end
  end


  private

    def find_taster
      @taster = Taster.find( params[:id] )
    end

    def valid_params
      params.require(:taster).permit(:name, :handle, :user_id, :status)
    end
end
