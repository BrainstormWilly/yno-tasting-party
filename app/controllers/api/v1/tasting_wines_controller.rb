class Api::V1::TastingWinesController < Api::BaseController

  def create
    # change this with Pundit
    if !current_host
      render json: { error: "Can not locate host", status: 403 }, status: 403
    else
      tw = TastingWine.new(tasting_wine_params)

      if tw.save
        tw.tasting.guests.each do |g|
          WineReview.create_next_in_sequence_for_guest(tw.tasting, g.taster) if g.confirmed
        end
        render json: tw, serializer: TastingWineSerializer
      else
        render json: { error: "Unknown Error", status: 400 }, status: 400
      end
    end
  end

  def destroy
    if current_host
      tw = TastingWine.find(params[:id])
      if tw.tasting.is_pending?
        if tw.destroy
          WineReview.delete_all_last_for_tasting(tw.tasting)
          render json: tw, serializer: TastingWineSerializer
        else
          render json: { error: "Unknown error", status: 400 }, status: 400
        end
      else
        render json: { error: "Can not remove wines while tasting in progress", status: 403 }, status: 403
      end
    else
      render json: { error: "Can not locate host", status: 403 }, status: 403
    end
  end

  def update
    if current_host
      tw = TastingWine.find(params[:id])
      # p tasting_wine_params
      tw.update(tasting_wine_params)
      if tw.save
        render json: tw, serializer: TastingWineSerializer
      else
        render json: { error: "Unknown error", status: 400 }, status: 400
      end
    else
      render json: { error: "Can not locate host", status: 403 }, status: 403
    end
  end


  private

  # def wine_create_attributes
  #   params.require(:wine).permit(:vintage, :name)
  # end

  def tasting_wine_params
    params.require(:tasting_wine).permit(:wine_id, :tasting_id, :wine_number, :average_rating, :price)
  end



end
