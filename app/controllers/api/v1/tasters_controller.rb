class Api::V1::TastersController < Api::BaseController


  def show
    # @taster = Taster.find_by(user_id: params[:id])
    render json: Taster.find(params[:id])
  end

  def tastings
    taster = Taster.find(params[:id])
    tastings = taster.guests.select{ |g| !g.invitation_open? }.map{ |g| g.tasting }
    render json: tastings, each_serializer: TastingSerializer
  end

  def reviews
    taster = Taster.find(params[:id])
    render json: taster.wine_reviews, each_serializer: WineReviewSerializer
  end

  def invites
    taster = Taster.find(params[:id])
    tastings = taster.guests.select{ |g| g.invitation_open? }.map{ |g| g.tasting }
    render json: tastings, each_serializer: TastingSerializer
  end

  def showByUser
    render json: Taster.find_by(user_id: params[:id])
  end

  def create
    taster = Taster.new(create_attributes)
    if taster.save
      render json: taster
    else
      render json: { error: "Unknown Error", status: 400 }, status: 400
    end
  end


  private

  def create_attributes
    params.require(:taster).permit(:name, :handle, :user_id)
  end


end
