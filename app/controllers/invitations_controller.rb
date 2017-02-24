class InvitationsController < Devise::InvitationsController

  def after_accept_path_for(resource)
    taster = Taster.find_by(user: resource)
    edit_taster_path(taster)
  end

end
