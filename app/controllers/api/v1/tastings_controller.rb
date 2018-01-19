class Api::V1::TastingsController < Api::BaseController

  # def index
  #   render json: Tasting.where(taster_id: params[:id])
  # end

  def show
    tasting = Tasting.find(params[:id])
    if tasting
      render json: tasting, serializer: tasting_serializer(tasting)
    else
      render json: { error: "Tasting not found.", status: 400 }, status: 400
    end
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

  def update
    if current_host
      tasting = Tasting.find(params[:id])
      if tasting.is_completed?
        render json: { error: "Can not update completed tasting.", status: 403 }, status: 403
      else
        tasting.update(valid_params)
        if tasting.save
          render json: tasting, serializer: tasting_serializer(tasting)
        else
          render json: { error: "Unknown error.", status: 400 }, status: 400
        end
      end
    else
      render json: { error: "Host Unconfirmed.", status: 403 }, status: 403
    end
  end

  def index
    if current_taster
      tastings = Guest.where(taster:current_taster).map{ |g| g.tasting }
      if current_host
        host_tastings = Tasting.where(host:current_host)
        host_tastings.each do |ht|
          tastings << ht if !tastings.include?(ht)
        end
      end
      render json: tastings, each_serializer: Tastings::List::TastingSerializer
    else
      render json: { error: "User Unauthorized", status: 401 }, status: 401
    end
  end
  # def tastingGuestStats
  #   stats = []
  #   stats["tasting"] = Tasting.find(params[:id])
  #   stats["guest"] = tasting.guests.find(params[:guest_id])
  # end
  private

    def valid_params
      params.require(:tasting).permit(:name, :open_at, :close_at, :closed_at, :completed_at, :private, :description, :host_id, :location_id)
    end

    def tasting_serializer(tasting)
      return Tastings::Show::Completed::TastingSerializer if tasting.is_completed?
      return Tastings::Show::Closed::TastingSerializer if tasting.is_closed?
      return Tastings::Show::Open::TastingSerializer if tasting.is_open?
      Tastings::Show::Pending::TastingSerializer
    end


end
