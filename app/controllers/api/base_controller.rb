class Api::BaseController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  # serialization_scope :view_context
  before_action :authenticate_user!

  private

  # def current_host
  #   Host.find_by(taster_id: current_taster.id)
  # end
  #
  # def current_taster
  #   Taster.find_by(user_id: current_user.id)
  # end

end
