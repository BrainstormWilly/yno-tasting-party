class TasterMailer < ApplicationMailer

  def invite_taster(tasting_taster)
    @taster = tasting_taster.taster
    @url = 'http://localhost:3000/tastings'
    @tasting = tasting_taster.tasting
    mail(to: @taster.user.email, subject: "You are invited to a Yno Tasting Party")
  end

end
