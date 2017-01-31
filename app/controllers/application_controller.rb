class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

    def current_taster
      Taster.find_by(user_id: current_user.id)
    end

    def current_host
      Host.find_by(taster_id: current_taster.id)
    end

end
