# Preview all emails at http://localhost:3000/rails/mailers/taster_mailer
class TasterMailerPreview < ActionMailer::Preview

  def invite_taster
    TasterMailer.invite_taster(Guest.first)
  end

  def invite_new_taster
    tasting = Tasting.first
    user = User.invite!({email: "test@noemail.com"}) do |u|
      u.skip_invitation = true
    end
    taster = Taster.new
    taster.name = "Mr. Test"
    taster.user = user
    taster.save
    guest = Guest.new
    guest.tasting = tasting
    guest.taster = taster
    guest.save
    TasterMailer.invite_new_taster(guest)
  end

end
