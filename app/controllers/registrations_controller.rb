class RegistrationsController < Devise::RegistrationsController


  def destroy
    taster = Taster.find_by(user: current_user)
    host = Host.find_by(taster: taster)
    host.delete if host
    taster.delete if taster
    super
  end



  protected

  def after_sign_up_path_for(resource)
    new_taster_path
  end

end
