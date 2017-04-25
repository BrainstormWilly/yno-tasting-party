class TasterMailer < ApplicationMailer
  helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`

  def invite_taster(guest)
    @taster = guest.taster
    @url = ENV['HOST_URL']
    @tasting = guest.tasting
    @open_at = client_timezone_str(@tasting.open_at)
    mail(to: @taster.user.email, subject: "You are invited to a Yno Tasting Party")
  end

  def invite_new_taster(guest)
    @user = guest.taster.user
    @tasting = guest.tasting
    @open_at = client_timezone_str(@tasting.open_at)
    @url = accept_user_invitation_url(invitation_token: @user.raw_invitation_token)
    # @user.deliver_invitation
    mail(to: @user.email, subject: "You are invited to a Yno Tasting Party")
  end

end
