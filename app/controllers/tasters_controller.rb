class TastersController < ApplicationController

  before_action :authenticate_user!
  before_action :find_taster, only: [:edit, :update]


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
    if params[:tasting_id]
      @user = User.new
      @tasting = Tasting.find(params[:tasting_id])
      render :new_tasting_taster
      return
    end
  end

  def create
    @taster = Taster.new(valid_params)
    @taster.user = current_user if @taster.user_id.blank?
    @taster.handle = @taster.name if @taster.handle.blank?
    if @taster.save
      if params[:tasting_id]
        @tasting = Tasting.find(params[:tasting_id])
        @tasting_taster = TastingTaster.new({tasting_id: @tasting.id, taster_id: @taster.id})
        if @tasting_taster.save
          flash[:notice] = "New taster '#{@taster.name}' added to tasting and system."
        else
          flash.now[:alert] = "There was an error adding taster '#{@taster.name}' to tasting. Please try again later."
        end
        redirect_to edit_tasting_path(@tasting)
      else
        flash[:notice] = "New taster '#{@taster.name}' added to system."
        redirect_to authenticated_root_path
      end
    else
      current_user.destroy
      flash[:alert] = 'There was an error signing up this taster. Please try again later.'
      redirect_to new_taster_path
    end
  end

  # def destroy
  #   @taster = Taster.find( params[:id] )
  #   if @taster.destroy
  #     flash[:notice] = "Taster deleted successfully"
  #     redirect_to authenticated_root_path
  #   else
  #     flash.now[:alert] = "There was an error deleting this taster. Please try again later."
  #     redirect_to edit_user_registration_path
  #   end
  # end


  private

    def find_taster
      @taster = Taster.find( params[:id] )
    end

    def valid_params
      params.require(:taster).permit(:name, :handle, :user_id)
    end
end
