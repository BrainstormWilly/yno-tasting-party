class Api::V1::TastingsController < Api::BaseController

  def index
    @tastings = Tasting.where(taster_id: params[:id])
    render json: @taster
  end

end
