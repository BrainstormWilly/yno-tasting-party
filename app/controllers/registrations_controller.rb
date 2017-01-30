class RegistrationsController < Devise::RegistrationsController

  def destroy
    taster = Taster.where(user: current_user).first
    taster.delete if taster
    super
  end



  protected

  def after_sign_up_path_for(resource)
    new_taster_path
  end

end
