class HostsController < ApplicationController

  before_action :authenticate_user!

  def new
    @host = Host.new
  end

  def update
    @host = Host.find( params[:id] )
    @host.assign_attributes( valid_params )
    if @host.save
      redirect_to authenticated_root_path
    else
      flash.now[:alert] = 'There was an error saving your host changes. Please try again later.'
      redirect_to edit_user_registration_path
    end
  end

  def create
    @host = Host.new(valid_params)
    @host.taster = current_taster if @host.taster.blank?
    if @host.save
      redirect_to new_tasting_path
    else
      current_user.destroy
      flash.now[:alert] = 'There was an error signing up this host. Please try again later.'
      redirect_to new_host_path
    end
  end

  private

    def valid_params
      params.require(:host).permit(:phone, :taster_id)
    end

end
