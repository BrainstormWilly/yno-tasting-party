require 'rails_helper'

RSpec.describe Admin, type: :model do

  let(:user){ create(:user) }
  let(:admin){ create(:admin, user:user) }

  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(1) }

  describe "attributes" do
    it "should have name, user attributes" do
      expect(admin).to have_attributes(name: admin.name, user: admin.user)
    end
  end

end
