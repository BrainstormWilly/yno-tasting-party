class AdminMailer < ApplicationMailer

  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`

  def contact_us(email, content, taster)
    @taster = taster
    @content = content
    @email = email
    mail(to: "bill@ynoguy.com", subject: "Contact request from #{taster.name}")
  end

  def new_taster_sign_up(taster)
    @taster = taster
    mail(to: "bill@ynoguy.com", subject: "New Taster Signup")
  end

  def new_tasting(tasting)
    @tasting = tasting
    mail(to: "bill@ynoguy.com", subject: "New Tasting Event")
  end

end
