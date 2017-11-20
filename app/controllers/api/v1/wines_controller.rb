class Api::V1::WinesController < Api::BaseController

  def create
    # change this with Pundit
    if !current_host
      render json: { error: "Can not locate host", status: 403 }, status: 403
    else
      wine = Wine.new(create_attributes)
      if wine.save
        render json: wine
      else
        render json: { error: "Unknown Error", status: 400 }, status: 400
      end
    end
  end


  private

  def create_attributes
    params.require(:wine).permit(:vintage, :name, :price)
  end

end
