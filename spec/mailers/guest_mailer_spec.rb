require "rails_helper"

RSpec.describe GuestMailer, type: :mailer do

  # let!(:guest_user){ create(:user) }
  let!(:host_user){ create(:user) }
  # let!(:guest_taster){ create(:taster, user:guest_user) }
  let!(:host_taster){ create(:taster, user:host_user) }
  let!(:host){ create(:host, taster:host_taster) }
  let!(:location){ create(:location) }
  let!(:host_location){ create(:host_location, host:host, location:location) }
  let!(:tasting){ create(:tasting, open_at:1.hour.from_now, host:host, location:location) }
  # let!(:guest){ create(:guest, tasting:tasting, taster:guest_taster) }


  describe "GET #invite_new_user" do
    before do
      @user = User.invite!({email: "brainstormwilly@gmail.com"}) do |u|
        u.skip_invitation = true
        u.invited_by_id = host.taster.user.id
      end
      taster = create(:taster, user:@user)
      @guest = create(:guest, taster:taster, tasting:tasting)
    end

    let(:invite_mail){ described_class.invite_new_user(@guest, @user.raw_invitation_token) }

    it "sets subject" do
      expect(invite_mail.subject).to eq "You are invited to a Yno Tasting Party"
    end

  end

end
