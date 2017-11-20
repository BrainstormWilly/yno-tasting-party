class GuestMailer < ApplicationMailer

  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`

  # def invite_taster(guest, open_at)
  #   @taster = guest.taster
  #   @url = ENV['HOST_URL']
  #   @tasting = guest.tasting
  #   @open_at = open_at
  #   mail(to: @taster.user.email, subject: "You are invited to a Yno Tasting Party")
  # end

  def invite_new_user(guest, token)

    @guest = guest
    @url = accept_user_invitation_url(invitation_token: token)

    mail(to: @guest.taster.user.email, subject: "You are invited to a Yno Tasting Party")

  end

end
