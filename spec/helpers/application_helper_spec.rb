require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do

  let!(:user){ create(:user) }
  let!(:taster){ create(:taster, user: user) }
  let!(:host){ create(:host, taster: taster) }
  let!(:location){ create(:location) }
  let!(:tasting){ create(:tasting, host: host, location: location, open_at: Time.current, close_at: 2.hours.from_now) }
  # let(:guest){ create(:guest, tasting: tasting, taster: taster) }

  describe "#tasting_badge" do
    before do
      @future_tasting = create(:tasting, location: location, host: host, open_at: 2.days.from_now)
      @closed_tasting = create(:tasting, location: location, host: host, open_at: 2.days.ago, closed_at: 1.day.ago)
      @completed_tasting = create(:tasting, location: location, host: host, open_at: 2.days.ago, closed_at: 1.day.ago, completed_at: 1.minute.ago)
      wine = create(:wine)
      closed_tasting_wine = create(:tasting_wine, wine: wine, tasting: @closed_tasting)
      closed_review = create(:wine_review, taster: taster, tasting: @closed_tasting, wine: wine, created_at: 2.days.ago, updated_at: 1.day.ago)
      completed_tasting_wine = create(:tasting_wine, wine: wine, tasting: @completed_tasting)
      completed_review = create(:wine_review, taster: taster, tasting: @completed_tasting, wine: wine, created_at: 2.days.ago, updated_at: 1.day.ago)
    end
    it "returns positive for current tasting" do
      expect(helper.tasting_badge(tasting)).to eq "<span class=\"badge badge-positive\">Open</span>"
    end
    it "returns negative for @closed_tasting" do
      expect(helper.tasting_badge(@closed_tasting)).to eq "<span class=\"badge badge-negative\">Closed</span>"
    end
    it "returns warning with start time for @future_tasting" do
      expect(helper.tasting_badge(@future_tasting)).to eq "<span class=\"badge badge-future\">#{helper.client_timezone_str(@future_tasting.open_at, true)}</span>"
    end
    it "returns neutral for @completed_tasting" do
      expect(helper.tasting_badge(@completed_tasting)).to eq "<span class=\"badge\">Completed</span>"
    end
  end

end
