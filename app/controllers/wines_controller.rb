class WinesController < ApplicationController

  before_action :authenticate_user!

  def new
    @tasting = Tasting.find(params[:tasting_id]) if params[:tasting_id]
    @wine = Wine.new
    if @tasting
      @wines = Wine.all
      render :new_tasting_wine
      return
    end
  end

  def create
    @tasting = Tasting.find(params[:tasting_id]) if params[:tasting_id]
    @wine = Wine.new( valid_params )
    if @wine.save
      if @tasting
        tasting_wine = TastingWine.create(tasting: @tasting, wine: @wine)
        flash[:notice] = 'Wine has been created and added to tasting.'
        redirect_to edit_tasting_path(@tasting)
      else
        # temporary
        redirect_to authenticated_root_path
      end

    else
      flash.now[:alert] = 'There was an error saving wine Please try again later.'
      if @tasting
        redirect_to new_tasting_wine_path(@tasting)
      else
        redirect_to authenticated_root_path
      end
    end
  end

  def destroy
    @wine = Wine.find(params[:id])
    if @wine.destroy
      flash[:notice] = 'Wine has been deleted from system.'
      redirect_to authenticated_root_path
    else
      flash.now[:alert] = 'There was an error deleting wine. Please try again later.'
      redirect_to authenticated_root_path
    end
  end


  private

  def valid_params
    params.require(:wine).permit(:name, :vintage, :price)
  end


end
