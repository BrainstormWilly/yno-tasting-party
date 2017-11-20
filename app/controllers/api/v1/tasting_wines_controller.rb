class Api::V1::TastingWinesController < Api::BaseController

  # def create
  #   # change this with Pundit
  #   if !current_host
  #     render json: { error: "Can not locate host", status: 403 }, status: 403
  #   else
  #     wine = Wine.new(create_attributes)
  #     if wine.save
  #       render json: wine
  #     else
  #       render json: { error: "Unknown Error", status: 400 }, status: 400
  #     end
  #   end
  # end
  def createForTasting
      # change this with Pundit
      if !current_host
        render json: { error: "Can not locate host", status: 403 }, status: 403
      else
        wine = Wine.new(wine_create_attributes)
        if wine.save
          tw = TastingWine.new(tasting_id:params[:tasting_id], wine_id:wine.id, price:params[:price])
          if tw.save
            render json: tw
          else
            render json: { error: "Unknown Error", status: 400 }, status: 400
          end
        else
          render json: { error: "Unknown Error", status: 400 }, status: 400
        end
      end
  end


  private

  def wine_create_attributes
    params.require(:wine).permit(:vintage, :name)
  end



end
