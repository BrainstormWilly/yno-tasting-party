class Api::V1::TastingsController < Api::BaseController

  # def index
  #   render json: Tasting.where(taster_id: params[:id])
  # end

  def show
    render json: Tasting.find(params[:id])
  end

  # def tastingGuestStats
  #   stats = []
  #   stats["tasting"] = Tasting.find(params[:id])
  #   stats["guest"] = tasting.guests.find(params[:guest_id])
  # end

end
