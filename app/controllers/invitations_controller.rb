class InvitationsController < Devise::InvitationsController

  private

  def after_accept_path_for(resource)
    flash[:notice] = "Welcome aboard! Now, tell others more about your wine interests."
    edit_taster_path(current_taster)
  end

end
