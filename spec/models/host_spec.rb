require 'rails_helper'

RSpec.describe Host, type: :model do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }

  it { is_expected.to validate_presence_of(:phone) }
  it { is_expected.to validate_length_of(:phone).is_at_least(10) }

  describe "attributes" do
    it "should have taster, phone attributes" do
      expect(host).to have_attributes(phone: host.phone, taster: host.taster)
    end
  end
end
