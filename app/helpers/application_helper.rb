module ApplicationHelper

  def current_taster
    Taster.where(user: current_user).first
  end

  def current_taster_exists?
    Taster.where(user: current_user).count > 0
  end

end
