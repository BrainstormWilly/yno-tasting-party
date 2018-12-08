class Api::V1::TastersController < Api::BaseController

  # moved to AdminController
  # def contactUs
  #   if params[:id]!=0
  #     taster = Taster.find(params[:id])
  #   else
  #     taster = Taster.new(name:contact_us_params[:name])
  #   end
  #   TasterMailer.contact_us(contact_us_params[:email], contact_us_params[:content], taster).deliver
  #   render json: {message: "Thank you! We’ll get back to you soon...promise."}
  # end

  def show
    # @taster = Taster.find_by(user_id: params[:id])
    render json: Taster.find(params[:id])
  end

  # deprecate to just showing count
  def tastings
    taster = Taster.find(params[:id])
    tastings = taster.guests.select{ |g| !g.invitation_open? }.map{ |g| g.tasting }
    render json: tastings, each_serializer: TastingSerializer
  end

  # deprecate to just showing count
  def reviews
    taster = Taster.find(params[:id])
    render json: taster.wine_reviews, each_serializer: WineReviewSerializer
  end

  # deprecate this to just showing count
  # def invites
  #   taster = Taster.find(params[:id])
  #   tastings = taster.guests.select{ |g| g.invitation_open? }.map{ |g| g.tasting }
  #   render json: tastings, each_serializer: TastingSerializer
  # end

  def inviteTastings
    taster = Taster.find(params[:id])
    tastings = taster.guests.select{ |g| g.invitation_open? }.map{ |g| g.tasting }
    render json: tastings, each_serializer: Tasters::Invites::TastingSerializer
  end

  def inviteTastingDetail
    taster = Taster.find(params[:id])
    tasting = Tasting.find(params[:tasting_id])
    render json: tasting, serializer: Tasters::Invites::TastingSerializer
  end

  def showByUser
    taster = Taster.find_by(user_id: params[:id])
    render json: taster, serializer: TasterSerializer
  end

  def create
    taster = Taster.new(create_attributes)
    taster.handle = taster.name if taster.handle.blank?
    if taster.save
      render json: taster, serializer: TasterSerializer
    else
      render json: { error: "Unknown Error", status: 400 }, status: 400
    end
  end

  def update
    taster = Taster.find(params[:id])
    taster.update(update_params)
    if taster.save
      render json: taster, serializer: TasterSerializer
    else
      render json: { error: "Unknown Error", status: 400 }, status: 400
    end
  end


  private

  def create_attributes
    params.require(:taster).permit(:name, :handle, :user_id)
  end

  def update_params
    params.require(:taster).permit(:name, :handle, :status)
  end

  # def contact_us_params
  #   params.require(:message).permit(:name, :content, :email)
  # end


end
