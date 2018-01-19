class Api::V1::LocationsController < Api::BaseController

  def create
    location = Location.new(create_attributes)
    if location.save
      render json: location, serializer: LocationSerializer
    else
      render json: { error: "Unknown Error", status: 400 }, status: 400
    end
  end


  private

  def create_attributes
    params.require(:location).permit(:phone, :address, :address, :address2, :city, :state, :postal)
  end

end
