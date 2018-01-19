class Api::V1::ConnectionsController < Api::BaseController

  # def hostFromUser
  #   if current_host
  #     render json: current_host, serializer: Tastings::New::HostSerializer
  #   else
  #     render json: { error: "User not registered as Host", status: 403 }, status: 403
  #   end
  # end

  # def index
  #   if current_host
  #     host_connections = Connection.where(host:current_host).to_a
  #     taster_connections = Connection.where(taster:current_taster).to_a
  #     render json: (host_connections << taster_connections).flatten, each_serializer: ConnectionSerializer
  #   else
  #     render json: { error: "Only hosts can see connections", status: 403 }, status: 403
  #   end
  # end

end
