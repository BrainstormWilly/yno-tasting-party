class HostsController < ApplicationController

  before_action :authenticate_user!

  # def new
  #   @host = Host.new
  # end
  #
  # def update
  #   @host = Host.find( params[:id] )
  #   @host.assign_attributes( valid_params )
  #   if @host.save
  #     redirect_to authenticated_root_path
  #   else
  #     flash.now[:alert] = 'There was an error saving your host changes. Please try again later.'
  #     redirect_to edit_user_registration_path
  #   end
  # end

  def create
    @host = Host.new( {taster_id: params[:taster_id]} )
    # @host.taster = current_taster if @host.taster.blank?
    if @host.save
      flash[:notice] = "Congratulations! You are now a host. Now let's add a location for your tastings."
      redirect_to edit_user_registration_path
    else
      flash.now[:alert] = 'There was an error signing up this host. Please try again later.'
      redirect_back(fallback_location: authenticated_root_path)
    end
  end

  # private
  #
  #   def valid_params
  #     params.require(:host).permit(:taster_id)
  #   end

end
