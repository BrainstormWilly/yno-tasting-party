class TastingsController < ApplicationController

  before_action :authenticate_user!
  before_action :set_tasting, only: [:show, :edit, :update, :destroy, :close]

  def index
    @public_tastings = Tasting.where(private:false)
  end

  def show
    if @tasting.is_completed?
      render :show_completed
    else
      render :show
    end
  end

  def new
    @tasting = Tasting.new
    @tasting.location_id = current_host.primary_location.id
  end

  def edit
    if @tasting.is_completed?
      flash[:alert] = "You are not allowed to edit a completed tasting."
      redirect_to tasting_path(@tasting)
    elsif @tasting.is_closed?
      render :edit_closed
    else
      render :edit
    end
  end

  def create
    @tasting = Tasting.new({
      name: valid_params["name"],
      description: valid_params["description"],
      private: valid_params["private"],
      host_id: valid_params["host_id"],
      location_id: valid_params["location_id"],
      open_at: Time.parse(valid_params["open_at"]).utc
    })
    @tasting.close_at = Time.parse(valid_params["close_at"]).utc unless valid_params["close_at"].blank?
    if @tasting.save
      flash[:notice] = "Tasting '#{@tasting.name}' created successfully."
      redirect_to edit_tasting_path(@tasting)
    else
      flash[:alert] = "Unable to create tasting. Please try again later."
      redirect_to new_tasting_path
    end
  end

  def update
    if @tasting.is_completed?
      flash[:alert] = "You are not allowed to update a completed tasting."
      redirect_to tasting_path(@tasting)
    else
      @tasting.update({
        name: valid_params["name"],
        description: valid_params["description"],
        private: valid_params["private"],
        host_id: valid_params["host_id"],
        location_id: valid_params["location_id"],
        open_at: Time.parse(valid_params["open_at"]).utc
      })
      @tasting.close_at = Time.parse(valid_params["close_at"]).utc unless valid_params["close_at"].blank?
      if @tasting.save
        flash[:notice] = "Tasting '#{@tasting.name}' updated successfully."
        redirect_to edit_tasting_path(@tasting)
      else
        flash[:alert] = "Failed to update tasting. Please try again later"
        redirect_to edit_tasting_path(@tasting)
      end
    end
  end

  def close
    if @tasting.is_completed?
      flash[:alert] = "You are not allowed to update a completed tasting."
      redirect_to tasting_path(@tasting)
    else
      @tasting.closed_at = Time.current
      if @tasting.save
        flash[:notice] = "Tasting '#{@tasting.name}' closed successfully. All reviews are final."
        redirect_to tasting_path(@tasting)
      else
        flash[:alert] = "Unable to close tasting. Please try again later"
        redirect_to edit_tasting_path(@tasting)
      end
    end
  end

  def destroy
    if @tasting.is_completed?
      flash[:alert] = "You are not allowed to destroy a completed tasting. Contact us for more info."
      redirect_to tasting_path(@tasting)
    else
      if @tasting.destroy
        flash[:notice] = "Tasting '#{@tasting.name}' deleted successfully."
        redirect_to authenticated_root_path
      else
        flash[:alert] = "Failed to delete tasting. Please try again later"
        redirect_to edit_tasting_path(@tasting)
      end
    end
  end

  private

    def set_tasting
      @tasting = Tasting.find(params[:id])
    end


    def valid_params
      params.require(:tasting).permit(:name, :open_at, :close_at, :private, :description, :host_id, :location_id)
    end

end
