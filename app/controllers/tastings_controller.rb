class TastingsController < ApplicationController

  before_action :authenticate_user!
  before_action :set_tasting, only: [:show, :edit, :update, :destroy]

  # GET /tastings
  # GET /tastings.json
  def index
    @public_tastings = Tasting.where(private:false)
  end

  # GET /tastings/1
  # GET /tastings/1.json
  def show
    p @tasting.wines.count
  end

  # GET /tastings/new
  def new
    @tasting = Tasting.new
  end

  # GET /tastings/1/edit
  def edit
  end

  # POST /tastings
  # POST /tastings.json
  def create
    @tasting = Tasting.new(tasting_params)

    respond_to do |format|
      if @tasting.save
        format.html { redirect_to @tasting, notice: 'Tasting was successfully created.' }
        format.json { render :show, status: :created, location: @tasting }
      else
        format.html { render :new }
        format.json { render json: @tasting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tastings/1
  # PATCH/PUT /tastings/1.json
  def update
    respond_to do |format|
      if @tasting.update(tasting_params)
        format.html { redirect_to @tasting, notice: 'Tasting was successfully updated.' }
        format.json { render :show, status: :ok, location: @tasting }
      else
        format.html { render :edit }
        format.json { render json: @tasting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tastings/1
  # DELETE /tastings/1.json
  def destroy
    @tasting.destroy
    respond_to do |format|
      format.html { redirect_to tastings_url, notice: 'Tasting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tasting
      @tasting = Tasting.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tasting_params
      params.fetch(:tasting, {})
    end

    def current_taster
      Taster.where(user: current_user).first
    end
end
