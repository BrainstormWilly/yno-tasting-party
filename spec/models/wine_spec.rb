require 'rails_helper'

RSpec.describe Wine, type: :model do

  let(:wine){ create(:wine) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_least(6) }
  it { is_expected.to validate_presence_of(:price) }

  
end
