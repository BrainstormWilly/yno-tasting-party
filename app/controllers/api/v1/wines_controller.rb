class Api::V1::WinesController < Api::BaseController

  def create
    if !current_host
      render json: { error: "Can not locate host", status: 403 }, status: 403
    else
      wine = Wine.where(vintage:create_attributes[:vintage]).where(name:create_attributes[:name]).first
      if wine
        render json: wine, serializer: WineSerializer
      else
        wine = Wine.new(create_attributes)
        if wine.save
          render json: wine, serializer: WineSerializer
        else
          render json: { error: "Unknown Error", status: 400 }, status: 400
        end
      end
    end
  end

  def show
    wine = Wine.find(params[:id])
    if wine
      render json: wine, serializer: WineSerializer
    else
      render json: { error: "Unknown Error", status: 400 }, status: 400
    end
  end


  private

  def create_attributes
    params.require(:wine).permit(:vintage, :name)
  end

end
