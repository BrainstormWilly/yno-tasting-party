module ApplicationHelper

  def current_taster
    Taster.find_by(user: current_user)
  end

  def current_host
    Host.find_by(taster: current_taster)
  end

  # def current_taster_exists?
  #   Taster.where(user: current_user).count > 0
  # end

end
