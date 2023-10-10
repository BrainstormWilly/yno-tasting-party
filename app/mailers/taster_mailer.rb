class TasterMailer < ApplicationMailer

  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`

  def invite_taster(guest, open_at)
    @taster = guest.taster
    @url = root_url
    @tasting = guest.tasting
    @open_at = open_at
    mail(to: @taster.user.email, subject: "You are invited to a Yno Tasting Party")
  end

  def invite_new_taster(guest, open_at)
    @user = guest.taster.user
    @tasting = guest.tasting
    @open_at = open_at
    @url = accept_user_invitation_url(invitation_token: @user.raw_invitation_token)
    mail(to: @user.email, subject: "You are invited to a Yno Tasting Party")
  end

  # def contact_us(email, content, taster)
  #   @taster = taster
  #   @content = content
  #   @email = email
  #   mail(to: "brainstormwilly@gmail.com", subject: "Contact request from #{taster.name}")
  # end

end
