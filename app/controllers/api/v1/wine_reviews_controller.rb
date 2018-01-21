class Api::V1::WineReviewsController < Api::BaseController

  def index
    reviews = WineReview.where(taster:current_taster)
    render json: reviews.reject{ |r| r.wine_id==nil }, each_serializer: Wines::WineReviewSerializer
  end

  # def edit
  #   render json: WineReview.find(params[:id])
  # end

  def status
    review = WineReview.find(params[:id])
    tasting_user_ids = review.tasting.guests.map{ |g| g.taster.user_id }
    if tasting_user_ids.include?(current_user.id) || review.tasting.host.taster.user==current_user
      render json: review, serializer: Tastings::Show::Open::Status::WineReviewSerializer
    else
      render json: { error: "Taster not associated with tasting", status: 403 }, status: 403
    end
  end

  def update
    review = WineReview.find(params[:id])
    if update_attributes[:wine_id]
      if current_host && review.tasting.host==current_host
        review.assign_attributes(update_attributes)
        if review.save
    			render json: review, serializer: wine_review_serializer(review)
    		else
    			render json: { error: "Unknown Error", status: 400 }, status: 400
    		end
      else
        render json: { error: "Only tasting hosts can reveal wines", status: 403 }, status: 403
      end
    elsif review.taster.user_id==current_user.id
      review.assign_attributes(update_attributes)
      if review.save
  			render json: review, serializer: wine_review_serializer(review)
  		else
  			render json: { error: "Unknown Error", status: 400 }, status: 400
  		end
    else
      render json: { error: "Taster not associated with tasting", status: 403 }, status: 403
    end
  end


  private

  def update_attributes
    params.require(:wine_review).permit(:rating, :comments, :wine_number, :taster_id, :wine_id)
  end

  def wine_review_serializer(wine_review)
    return Tastings::Show::Closed::WineReviewSerializer if wine_review.tasting.is_closed?
    return Tastings::Show::Completed::WineReviewSerializer if wine_review.tasting.is_completed?
    WineReviewSerializer
  end

end
