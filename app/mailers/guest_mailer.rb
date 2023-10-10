class GuestMailer < ApplicationMailer
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`

  # Host notifies guest of tasting cancellation
  def cancel_tasting_to_guest(guest)
    @guest = guest
    mail(to: @guest.taster.user.email, subject: "Yno Tasting has been cancelled")
  end

  # Host invites user not in system
  def invite_new_user(guest, token, local_open_at)
    @guest = guest
    @url = "#{root_url}/user/accept_invite/#{token}"
    @local_open_at = local_open_at
    mail(to: @guest.taster.user.email, subject: "You are invited to a Yno Tasting")
  end

  # Host invites connected taster in system
  def invite_taster(guest, local_open_at)
    @guest = guest
    # @url = "#{ENV['HOST_URL']}/guests/invitations"
    @url = "#{root_url}/dashboard/invitations"
    @local_open_at = local_open_at
    mail(to: @guest.taster.user.email, subject: "You are invited to a Yno Tasting")
  end

  # Guest confirms invite
  def confirm_guest_to_host(guest)
    @guest = guest
    # @url = "#{ENV['HOST_URL']}/tastings/#{guest.tasting_id}"
    @url = tasting_route(guest.tasting_id)
    mail(to: @guest.tasting.host.taster.user.email, subject: "You have a Yno Tasting guest confirmation")
  end

  # Guest denies invite
  def deny_guest_to_host(guest)
    @guest = guest
    @url = tasting_route(guest.tasting_id)
    mail(to: @guest.tasting.host.taster.user.email, subject: "You have a Yno Tasting guest cancellation")
  end

  # Host removes confirmed guest from tasting
  def remove_guest_from_host(guest)
    @guest = guest
    mail(to: @guest.taster.user.email, subject: "You have been removed from a Yno Tasting")
  end

  # Confirmed guest removes self from tasting
  def remove_guest_to_host(guest)
    @guest = guest
    mail(to: @guest.tasting.host.taster.user.email, subject: "A guest has left your Yno Tasting")
  end

  # Host updates taster on tasting changes
  def update_tasting_to_guest(guest, local_open_at)
    @guest = guest
    @local_open_at = local_open_at
    @url = tasting_route(guest.tasting_id)
    mail(to: @guest.taster.user.email, subject: "Important Update to Yno Tasting '#{guest.tasting.name}'")
  end

  private

  def tasting_route(id)
    "#{root_url}/tastings/#{id}"
  end

end
