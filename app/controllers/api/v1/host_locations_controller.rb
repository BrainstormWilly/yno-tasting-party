class Api::V1::HostLocationsController < Api::BaseController

  def create
    if current_host
      host_location = HostLocation.new(create_attributes)
      host_location.host_id = current_host.id
      if host_location.save
        render json: host_location, serializer: HostLocationSerializer
      else
        render json: { error: "Unknown Error", status: 400 }, status: 400
      end
    else
      render json: { error: "Must be a host to add locations", status: 403 }, status: 403
    end
  end

  def update
    if current_host
      host_location = HostLocation.find(params[:id])
      if host_location.host==current_host
        host_location.update(update_params)
        if host_location.save
          render json: host_location, serializer: HostLocationSerializer
        else
          render json: { error: "Unknown Error", status: 400 }, status: 400
        end
      else
        render json: { error: "Host can only update own locations", status: 403 }, status: 403
      end
    else
      render json: { error: "Only hosts can update locations", status: 403 }, status: 403
    end
  end

  def destroy
    if current_host
      host_location = HostLocation.find(params[:id])
      if host_location.host==current_host
        if host_location.destroy
          render json: host_location, serializer: HostLocationSerializer
        else
          render json: { error: "Unknown Error", status: 400 }, status: 400
        end
      else
        render json: { error: "Hosts can only delete their own locations", status: 403 }, status: 403
      end
    else
      render json: { error: "Only hosts can delete locations", status: 403 }, status: 403
    end
  end


  private

  def create_attributes
    params.require(:host_location).permit(:location_id, :primary)
  end

  def update_params
    params.require(:host_location).permit(:primary)
  end

end
