class Api::V1::HostLocationsController < Api::BaseController

  def create
    # change this with Pundit
    if !current_host
      render json: { error: "Can not locate host", status: 403 }, status: 403
    else
      location = Location.new(create_attributes)
      if location.save
        host_location = HostLocation.new(host: current_host, location: location, primary: false)
        if host_location.save
          render json: host_location
        else
          render json: { error: "Unable to save location to host", status: 400 }, status: 400
        end
      else
        render json: { error: "Unknown Error", status: 400 }, status: 400
      end
    end
  end


  private

  def create_attributes
    params.require(:location).permit(:phone, :address, :address2, :city, :state, :postal)
  end

end
