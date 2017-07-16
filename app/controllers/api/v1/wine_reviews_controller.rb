class Api::V1::WineReviewsController < Api::BaseController

  # def index
  #   render json: Tasting.where(taster_id: params[:id])
  # end

  # def edit
  #   render json: WineReview.find(params[:id])
  # end

  def update
    review = WineReview.find(params[:id])
    review.assign_attributes(update_attributes)
    if review.save
			render json: review
		else
			render json: { error: "Unknown Error", status: 400 }, status: 400
		end
  end


  private

  def update_attributes
    params.require(:wine_review).permit(:rating, :comments, :wine_number, :taster_id)
  end

end
