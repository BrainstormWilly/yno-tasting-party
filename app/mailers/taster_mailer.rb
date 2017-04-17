class TasterMailer < ApplicationMailer

  def invite_taster(guest)
    @taster = guest.taster
    @url = authenticated_root_path
    @tasting = guest.tasting
    mail(to: @taster.user.email, subject: "You are invited to a Yno Tasting Party")
  end

  def invite_new_taster(guest)
    @user = guest.taster.user
    @tasting = guest.tasting
    @url = accept_user_invitation_url(invitation_token: @user.raw_invitation_token)
    @user.deliver_invitation
    mail(to: @user.email, subject: "You are invited to a Yno Tasting Party")
  end

end
