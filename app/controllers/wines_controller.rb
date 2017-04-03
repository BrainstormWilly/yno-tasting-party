class WinesController < ApplicationController

  before_action :authenticate_user!

  def new
    @wine = Wine.new
  end

  def create
    @wine = Wine.new( valid_params )
    if @wine.save
      flash[:notice] = 'Wine successfully created.'
    else
      flash.now[:alert] = 'There was an error saving wine Please try again later.'
    end
    redirect_back(fallback_location: authenticated_root_path)
  end

  def destroy
    @wine = Wine.find(params[:id])
    if @wine.tasting_wines.empty?
      if @wine.destroy
        flash[:notice] = 'Wine has been deleted from system.'
        redirect_back(fallback_location: authenticated_root_path)
      else
        flash.now[:alert] = 'There was an error deleting wine. Please try again later.'
        redirect_back(fallback_location: authenticated_root_path)
      end
    else
      flash.now[:alert] = 'Wines used in tastings can not be deleted.'
      redirect_back(fallback_location: authenticated_root_path)
    end
  end


  private

    def valid_params
      params.require(:wine).permit(:name, :vintage, :price)
    end


end
