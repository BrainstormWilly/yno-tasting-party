class Api::V1::HostsController < Api::BaseController

  def hostFromUser
    if current_host
      render json: current_host, serializer: Tastings::New::HostSerializer
    else
      render json: { error: "Taster not registered as Host", status: 403 }, status: 403
    end
  end

  def create
    if current_host
      render json: { error: "Host already created", status: 403 }, status: 403
    else
      host = Host.new(host_create_params)
      if host.save
        # connections = Connection.where(taster_id:host.taster_id)
        # connections.each do |c|
        #   Connection.create(host_id:host.id, taster_id:c.host.taster_id)
        # end
        render json: host, serializer: HostSerializer
      else
        render json: { error: "Unknown Error", status: 400 }, status: 400
      end
    end
  end



  private

  def host_create_params
    params.require(:host).permit(:taster_id)
  end

end
