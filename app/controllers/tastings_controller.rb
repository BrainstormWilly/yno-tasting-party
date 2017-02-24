class TastingsController < ApplicationController

  before_action :authenticate_user!
  before_action :set_tasting, only: [:show, :edit, :update, :destroy, :close]

  def index
    @public_tastings = Tasting.where(private:false)
  end

  def show
  end

  def new
    @tasting = Tasting.new
  end

  def edit
  end

  def create
    @tasting = Tasting.new(valid_params)
    if @tasting.save
      flash[:notice] = "Tasting '#{@tasting.name}' created successfully."
      redirect_to edit_tasting_path(@tasting)
    else
      flash[:alert] = "Unable to create tasting. Please try again later."
      redirect_to new_tasting_path
    end
  end

  def update
    @tasting.update(valid_params)
    if @tasting.save
      flash[:notice] = "Tasting '#{@tasting.name}' updated successfully."
      redirect_to edit_tasting_path(@tasting)
    else
      flash[:alert] = "Failed to update tasting. Please try again later"
      redirect_to edit_tasting_path(@tasting)
    end
  end

  def close
    @tasting.closed_at = Time.current
    if @tasting.save
      flash[:notice] = "Tasting '#{@tasting.name}' closed successfully. All reviews are final."
      redirect_to tasting_path(@tasting)
    else
      flash[:alert] = "Unable to close tasting. Please try again later"
      redirect_to edit_tasting_path(@tasting)
    end
  end

  def destroy
    if @tasting.destroy
      flash[:notice] = "Tasting '#{@tasting.name}' deleted successfully."
      redirect_to authenticated_root_path
    else
      flash[:alert] = "Failed to delete tasting. Please try again later"
      redirect_to edit_tasting_path(@tasting)
    end
  end

  private

    def set_tasting
      @tasting = Tasting.find(params[:id])
    end


    def valid_params
      params.require(:tasting).permit(:name, :open_at, :close_at, :private, :description, :host_id)
    end

end
