class Api::V1::AdminController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :authenticate_user!, only: [:newTasting]

  def contactUs
    if current_taster
      taster = current_taster
    else
      taster = Taster.new(name:contact_us_params[:name])
    end
    AdminMailer.contact_us(contact_us_params[:email], contact_us_params[:content], taster).deliver
    render json: {message: "Thank you #{taster.name}! We’ll get back to you soon...promise."}
  end

  def newSignUp
    taster = Taster.find(params[:taster_id])
    AdminMailer.new_taster_sign_up(taster).deliver
    render json: taster
  end

  def newTasting
    tasting = Tasting.find(params[:tasting_id])
    AdminMailer.new_tasting(tasting).deliver
    render json: tasting
  end


  private

  def contact_us_params
    params.require(:message).permit(:name, :content, :email)
  end

  # def new_taster_sign_up_params
  #   params.require(:taster).permit(:taster_id)
  # end
  #
  # def new_tasting_params
  #   params.require(:tasting).permit(:tasting_id)
  # end

end
