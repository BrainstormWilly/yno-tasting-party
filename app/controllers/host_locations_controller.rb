class HostLocationsController < ApplicationController

  before_action :authenticate_user!

  def set_as_primary
    @host_location = HostLocation.find(params[:id])
    @host_location.primary = true;
    if !@host_location.save
      flash[:alert] = "Unabled to set host location as primary. Please try again later."
    end
    redirect_to edit_user_registration_path
  end

  def create
    @host_location = HostLocation.new(location_params)
    if @host_location.save
      flash[:notice] = "Tasting location successfully added for host"
    else
      flash[:alert] = "Did not add location for host. Try editing location."
    end
    redirect_to edit_user_registration_path
  end

  def destroy
    @host_location = HostLocation.find(params[:id])
    if @host_location.destroy
      flash[:notice] = "Host tasting location successfully deleted."
    else
      flash[:alert] = "Unabled to delete host tasting location. Please try again later."
    end
    redirect_to edit_user_registration_path
  end

  def location_params
    params.require(:host_location).permit(:location_id, :host_id)
  end

end
