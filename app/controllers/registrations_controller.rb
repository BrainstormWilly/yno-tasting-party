class RegistrationsController < DeviseTokenAuth::RegistrationsController

  # def create
  #   build_resource(sign_up_params)
  #   resource.save
  #   yield resource if block_given?
  #   if resource.persisted?
  #     if resource.active_for_authentication?
  #       set_flash_message! :notice, :signed_up
  #       sign_up(resource_name, resource)
  #       respond_with resource, location: after_sign_up_path_for(resource)
  #     else
  #       set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
  #       expire_data_after_sign_in!
  #       respond_with resource, location: after_inactive_sign_up_path_for(resource)
  #     end
  #   else
  #     clean_up_passwords resource
  #     set_minimum_password_length
  #     respond_with resource
  #   end
  # end

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
