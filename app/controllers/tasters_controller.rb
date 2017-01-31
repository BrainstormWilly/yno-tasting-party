class TastersController < ApplicationController

  before_action :authenticate_user!

  # def index
  # end

  def new
    @taster = Taster.new
  end

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

  def create
    @taster = Taster.new(valid_params)
    @taster.user = current_user if @taster.user.blank?
    if @taster.handle.blank?
      @taster.handle = @taster.name
    end
    if @taster.save
      redirect_to authenticated_root_path
    else
      current_user.destroy
      flash.now[:alert] = 'There was an error signing up this taster. Please try again later.'
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

    def valid_params
      params.require(:taster).permit(:name, :handle)
    end
end
