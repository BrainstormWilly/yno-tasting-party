class Api::V1::HostsController < Api::BaseController

  def hostFromUser
    if current_host
      render json: current_host, serializer: Tastings::New::HostSerializer
    else
      render json: { error: "User not registered as Host", status: 403 }, status: 403
    end
  end

end
