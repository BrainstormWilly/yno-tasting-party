class WineReviewsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_wine_review

  # def show
  #   @tasting = Tasting.find(params[:tasting_id])
  # end

  def edit

  end

  def update
    @wine_review.update(valid_update_params)
    if @wine_review.save
      flash[:notice] = "Wine #{@wine_review.wine_number} rated #{@wine_review.rating}."
      redirect_to tasting_path(@wine_review.tasting)
    else
      flash[:alert] = "Unable to update wine review. Please try again later."
      redirect_to tasting_path(@wine_review.tasting)
    end
  end

  # def create
  #   @wine_review = WineReview.new(valid_create_params)
  #   if @wine_review.save
  #     flash[:notice] = "Wine review successfully saved."
  #     redirect_to tasting_path(valid_create_params[:tasting_id])
  #   else
  #     flash[:alert] = "Unable to save wine review. Please try again later."
  #     redirect_to tasting_path(valid_create_params[:tasting_id])
  #   end
  # end
  #
  # def destroy
  #   if @wine_review.destroy
  #     flash[:notice] = "Wine review successfully deleted. You still need to review this wine to complete tasting."
  #     redirect_to tasting_path(@wine_review.tasting)
  #   else
  #     flash[:alert] = "Unable to delete wine review. Please try again later."
  #     redirect_to tasting_path(@wine_review.tasting)
  #   end
  # end


  private

    def find_wine_review
      @wine_review = WineReview.find(params[:id])
      if !@wine_review.tasting.is_open?
        flash[:alert] = "Tsk. Tsk. Wine reviews are not currently allowed on this tasting."
        redirect_to tasting_path(@wine_review.tasting)
      end
    end

    def valid_update_params
      params.require(:wine_review).permit(:rating, :comments)
    end

end
