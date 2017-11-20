class Api::V1::TastingsController < Api::BaseController

  # def index
  #   render json: Tasting.where(taster_id: params[:id])
  # end

  def show
    render json: Tasting.find(params[:id])
  end

  def new
    if current_host
      render json: { message: "Host Confirmed.", status: 200 }, status: 200
    else
      render json: { error: "Host Unconfirmed.", status: 403 }, status: 403
    end
  end

  def create
    if current_host
      tasting = Tasting.new(valid_params)
      tasting.host = current_host

      # tasting.open_at = client_timezone.time_with_offset(valid_params["open_at"])
      # tasting.close_at = client_timezone.time_with_offset(valid_params["close_at"]) unless valid_params["close_at"].blank?
      if tasting.save
        render json: tasting, serializer: Tastings::New::TastingSerializer
      else
        render json: { error: "Unknown error.", status: 400 }, status: 400
      end
    else
      render json: { error: "Host Unconfirmed.", status: 403 }, status: 403
    end
  end

  # def tastingGuestStats
  #   stats = []
  #   stats["tasting"] = Tasting.find(params[:id])
  #   stats["guest"] = tasting.guests.find(params[:guest_id])
  # end
  private

    def valid_params
      params.require(:tasting).permit(:name, :open_at, :close_at, :private, :description, :host_id, :location_id)
    end


end
