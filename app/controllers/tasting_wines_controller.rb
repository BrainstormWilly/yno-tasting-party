class TastingWinesController < ApplicationController

  before_action :authenticate_user!
  before_action :set_tasting_wine, only: [:destroy]

  # def index
  #   @tasting = Tasting.find(params[:tasting_id])
  #   @tasting_wines = TastingWine.where(tasting: @tasting)
  # end
  #
  # def show
  # end
  #
  # def new
  #   @tasting = Tasting.find(params[:tasting_id])
  #   @wines = Wine.all
  #   @tasting_wine = TastingWine.new
  # end

  def create
    @tasting_wine = TastingWine.new(valid_params)
    if @tasting_wine.save
      flash[:notice] = "Wine added successfully."
      redirect_to tasting_path(@tasting_wine.tasting)
    else
      flash[:alert] = 'There was an error creating tasting wine. Please try again later.'
      redirect_to new_tasting_wine_path(@tasting_wine.tasting)
    end
  end

  def destroy
    if @tasting_wine.destroy
      redirect_to tasting_path(@tasting_wine.tasting)
    else
      flash.now[:alert] = 'There was an error deleting tasting wine. Please try again later.'
      render_template(:show)
    end
  end

  private

    def set_tasting_wine
      @tasting_wine = TastingWine.find(params[:id])
    end

    def valid_params
      params.require(:tasting_wine).permit(:tasting_id, :wine_id)
    end

end
