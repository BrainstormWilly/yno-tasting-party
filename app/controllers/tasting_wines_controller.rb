class TastingWinesController < ApplicationController

  before_action :authenticate_user!
  before_action :set_tasting_wine, only: [:reveal, :destroy]

  # def index
  #   @tasting = Tasting.find(params[:tasting_id])
  #   @tasting_wines = TastingWine.where(tasting: @tasting)
  # end
  #
  # def show
  # end
  #
  def new
    @tasting = Tasting.find(params[:tasting_id])
    tasting_wines = @tasting.tasting_wines.map{ |tw| tw.wine_id }
    @wines = Wine.where.not(id: tasting_wines)
    @tasting_wine = TastingWine.new
  end

  def reveal
    if @tasting_wine.tasting.is_completed?
      flash[:alert] = "Revealing wines only allowed on closed tastings."
      redirect_to tasting_path(@tasting_wine.tasting)
    elsif @tasting_wine.tasting.is_closed?
      @tasting_wine.wine_number = params[:wine_number]
      if @tasting_wine.save
        flash[:notice] = "#{@tasting_wine.wine.name} revealed as wine #{@tasting_wine.wine_number}."
        redirect_to edit_tasting_path(@tasting_wine.tasting)
      else
        flash[:alert] = 'There was an error setting wine number. Please try again later.'
        redirect_to edit_tasting_path(@tasting_wine.tasting)
      end
    else
      flash[:alert] = "Revealing wines only allowed on closed tastings."
      redirect_to edit_tasting_path(@tasting_wine.tasting)
    end
  end

  def create
    @tasting_wine = TastingWine.new({tasting_id: params[:tasting_id], wine_id: params[:wine_id]})
    if @tasting_wine.tasting.is_closed?
      flash[:alert] = 'Adding wines not allowed on closed or completed tastings.'
      redirect_to tasting_path(@tasting_wine.tasting)
    elsif @tasting_wine.save
      @tasting_wine.tasting.guests.each do |g|
        WineReview.create_next_in_sequence_for_guest(@tasting_wine.tasting, g.taster)
      end
      flash[:notice] = "Tasting wine added successfully."
      redirect_to tasting_wines_new_path(@tasting_wine.tasting)
    else
      flash[:alert] = 'There was an error creating tasting wine. Please try again later.'
      redirect_to tasting_wines_new_path(@tasting_wine.tasting)
    end
  end

  def destroy
    if @tasting_wine.tasting.is_completed?
      flash[:alert] = 'Deleting wines not allowed on completed tastings.'
      redirect_to tasting_path(@tasting_wine.tasting)
    elsif @tasting_wine.tasting.has_rated_reviews?
      flash[:alert] = 'Deleting wines after wine reviews have been recorded is not allowed.'
      redirect_to edit_tasting_path(@tasting_wine.tasting)
    elsif @tasting_wine.destroy
      WineReview.delete_all_last_for_tasting(@tasting_wine.tasting)
      flash[:notice] = "Tasting wine successfully removed from tasting."
      redirect_to edit_tasting_path(@tasting_wine.tasting)
    else
      flash[:alert] = 'There was an error deleting tasting wine. Please try again later.'
      redirect_to edit_tasting_path(@tasting_wine.tasting)
    end
  end


  private

    def set_tasting_wine
      @tasting_wine = TastingWine.find(params[:id])
    end

    def create_params
      params.require(:tasting_wine).permit(:tasting_id, :wine_id)
    end

    def update_params
      params.require(:tasting_wine).permit(:wine_number)
    end

end
