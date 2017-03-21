require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the TastingsHelper. For example:
#
# describe TastingsHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe TastingsHelper, type: :helper do

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host, open_at: Time.current, close_at: 2.hours.from_now) }
  # let(:guest){ create(:guest, tasting: tasting, taster: taster) }

  def create_wines(completed)
    wines = []
    5.times do |i|
      wines[i] = create(:wine)
      create(:tasting_wine, tasting: tasting, wine: wines[i], wine_number: completed ? i+1 : 0)
    end
    3.times do
      test_user = create(:user)
      test_taster = create(:taster, user: user)
      test_guest = create(:guest, tasting: tasting, taster: test_taster)
      5.times do |i|
        create(:wine_review, tasting: tasting, taster: test_taster, wine: wines[i], rating: (1..5).to_a.sample, wine_number: i+1)
      end
    end
  end

  context "Host CRUD" do
    # before do
    #   @request.env["devise.mapping"] = Devise.mappings[:user]
    #   sign_in user, scope: :user
    # end
    describe "#taster_has_invitations?" do
      before do
        user2 = create(:user)
        @taster2 = create(:taster, user: user2)
        @guest2 = create(:guest, tasting: tasting, taster: @taster2, invited: Time.current)
      end
      context "has invitations" do
        it "returns true" do
          expect(helper.taster_has_invitations?(@taster2)).to be_truthy
        end
      end
      context "has no invitations due to @guest2.confirmed" do
        before do
          @guest2.confirmed = Time.current
          @guest2.save
        end
        it "returns false" do
          expect(helper.taster_has_invitations?(@taster2)).to be_falsey
        end
      end
      context "has no invitations due to @tasting.closed_at" do
        before do
          tasting.closed_at = Time.current
          tasting.save
        end
        it "returns false" do
          expect(helper.taster_has_invitations?(@taster2)).to be_falsey
        end
      end
    end
    describe "#taster_has_tastings?" do
      before do
        user2 = create(:user)
        @taster2 = create(:taster, user: user2)
        @guest2 = create(:guest, tasting: tasting, taster: @taster2, invited: Time.current)
      end
      context "has no tastings due to @guest2.confirmed==nil" do
        it "returns true" do
          expect(helper.taster_has_tastings?(@taster2)).to be_falsey
        end
      end
      context "has no tastings due to taster == host" do
        it "returns false" do
          expect(helper.taster_has_tastings?(taster)).to be_falsey
        end
      end
      context "has tastings due to @guest2.confirmed" do
        before do
          @guest2.confirmed = Time.current
          @guest2.save
        end
        it "returns false" do
          expect(helper.taster_has_tastings?(@taster2)).to be_truthy
        end
      end
    end
    describe "#current_guest" do
      before do
        user2 = create(:user)
        @taster2 = create(:taster, user: user2)
        @guest2 = create(:guest, tasting: tasting, taster: @taster2, invited: Time.current)
      end
      it "returns Guest for @taster2" do
        expect(helper.current_guest(tasting, @taster2)).to eq @guest2
      end
      it "returns falsey for non-tasting host" do
        expect(helper.current_guest(tasting, taster)).to be_falsey
      end
    end
    describe "#review_badge_color" do
      it "returns positive for rating > 3" do
        expect(helper.review_badge_color(4)).to eq "badge-positive"
      end
      it "returns negative for rating < 3" do
        expect(helper.review_badge_color(2)).to eq "badge-negative"
      end
      it "returns neutral for rating == 3" do
        expect(helper.review_badge_color(3)).to eq "badge-neutral"
      end
    end
    describe "#tasting_badge" do
      before do
        @future_tasting = create(:tasting, host: host, open_at: 2.days.from_now)
        @closed_tasting = create(:tasting, host: host, open_at: 2.days.ago, closed_at: 1.day.ago)
        @completed_tasting = create(:tasting, host: host, open_at: 2.days.ago, closed_at: 1.day.ago, completed_at: 1.minute.ago)
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
        expect(helper.tasting_badge(@future_tasting)).to eq "<span class=\"badge badge-future\">#{@future_tasting.open_at.strftime('%b %-d, %l:%M%P')}</span>"
      end
      it "returns neutral for @completed_tasting" do
        expect(helper.tasting_badge(@completed_tasting)).to eq "<span class=\"badge\">Completed</span>"
      end
    end
    describe "#tasting_status" do
      before do
        @future_tasting = create(:tasting, host: host, open_at: 2.days.from_now)
        @closed_tasting = create(:tasting, host: host, open_at: 2.days.ago, closed_at: 1.day.ago)
        @completed_tasting = create(:tasting, host: host, open_at: 2.days.ago, closed_at: 1.day.ago, completed_at: 1.minute.ago)
        wine = create(:wine)
        closed_tasting_wine = create(:tasting_wine, wine: wine, tasting: @closed_tasting)
        closed_review = create(:wine_review, taster: taster, tasting: @closed_tasting, wine: wine, created_at: 2.days.ago, updated_at: 1.day.ago)
        completed_tasting_wine = create(:tasting_wine, wine: wine, tasting: @completed_tasting)
        completed_review = create(:wine_review, taster: taster, tasting: @completed_tasting, wine: wine, created_at: 2.days.ago, updated_at: 1.day.ago)
      end
      it "returns well-open for current tasting" do
        expect(helper.tasting_status(tasting)).to eq "well-open"
      end
      it "returns well-closed for @closed_tasting" do
        expect(helper.tasting_status(@closed_tasting)).to eq "well-closed"
      end
      it "returns well-future for @future_tasting" do
        expect(helper.tasting_status(@future_tasting)).to eq "well-future"
      end
      it "returns empty for @completed_tasting" do
        expect(helper.tasting_status(@completed_tasting)).to eq ""
      end
    end
    describe "#tasting_has_reviews?" do
      before do
        wine = create(:wine)
        create_time = 1.minute.ago
        tasting_wine = create(:tasting_wine, wine: wine, tasting: tasting)
        user2 = create(:user)
        @taster2 = create(:taster, user: user2)
        @guest2 = create(:guest, tasting: tasting, taster: @taster2, invited: Time.current)
        @wine_review = create(:wine_review, tasting: tasting, taster: @taster2, wine: wine)
      end
      context "tasting without review" do
        it "returns false for tasting" do
          expect(helper.tasting_has_reviews?(tasting)).to be_falsey
        end
      end
      context "tasting with review" do
        before do
          @wine_review.updated_at = 1.minute.from_now
          @wine_review.save
        end
        it "returns true for tasting" do
          expect(helper.tasting_has_reviews?(tasting)).to be_truthy
        end
      end
    end
    describe "wine_number_btn_color" do
      before do
        wine = create(:wine)
        @tasting_wine = create(:tasting_wine, wine: wine, tasting: tasting, wine_number: 1)
      end
      it "returns btn-default when number doesn't match" do
        expect(helper.wine_number_btn_color(@tasting_wine, 3)).to eq "btn-default"
      end
      it "returns btn-primary when number matches" do
        expect(helper.wine_number_btn_color(@tasting_wine, 1)).to eq "btn-primary"
      end
    end
    describe "avg_tasting_wine_rating" do
      before do
        @wine = create(:wine)
        @tasting_wine = create(:tasting_wine, wine: @wine, tasting: tasting)
      end
      context "unrevealed" do
        it "returns 'unrevealed' when TastingWine#wine_number unassigned" do
          expect(helper.avg_tasting_wine_rating(@tasting_wine)).to eq "unrevealed"
        end
      end
      context "reveaaled" do
        before do
          wine_review = create(:wine_review, tasting: tasting, taster: taster, wine: @wine, rating: 3)
          user2 = create(:user)
          taster2 = create(:taster, user: user2)
          guest2 = create(:guest, tasting: tasting, taster: taster2)
          wine_review2 = create(:wine_review, tasting: tasting, taster: taster2, wine: @wine, rating: 5)
          @tasting_wine.wine_number = 1
          @tasting_wine.save
        end
        it "returns average rating (4) when TastingWine#wine_number assigned" do
          expect(helper.avg_tasting_wine_rating(@tasting_wine)).to eq 4
        end
      end
    end
    describe "guest_tasting_wine_rating" do
      before do
        user2 = create(:user)
        @taster2 = create(:taster, user: user2)
        wine = create(:wine)
        @wine_review = create(:wine_review, tasting: tasting, taster: taster, wine: wine, created_at: Time.current, updated_at: 1.hour.from_now)
        @tasting_wine = create(:tasting_wine, wine: wine, tasting: tasting, wine_number: @wine_review.wine_number)
      end
      context "when taster has no reviews" do
        it "returns empty string" do
          expect(helper.guest_tasting_wine_rating(@tasting_wine, @taster2)).to eq "Unrated"
        end
      end
      context "when taster has review" do
        it "returns rating string " do
          expect(helper.guest_tasting_wine_rating(@tasting_wine, taster)).to eq 3
        end
      end
    end
    describe "taster_has_reviews?" do
      before do
        wine = create(:wine)
        @wine_review = create(:wine_review, tasting: tasting, taster: taster, wine: wine)
      end
      context "has not reviewed" do
        it "returns false" do
          expect(helper.taster_has_reviews?(tasting, taster)).to be_falsey
        end
      end
      context "has reviewed at least one wine" do
        before do
          @wine_review.updated_at = 1.minute.from_now
          @wine_review.save
        end
        it "returns true" do
          expect(helper.taster_has_reviews?(tasting, taster)).to be_truthy
        end
      end
    end
    describe "taster_last_review" do
      before do
        wine1 = create(:wine)
        @wine_review1 = create(:wine_review, tasting: tasting, taster: taster, wine: wine1)
        @wine_review1.updated_at = 2.minutes.from_now
        @wine_review1.save
        wine2 = create(:wine)
        @wine_review2 = create(:wine_review, tasting: tasting, taster: taster, wine: wine2)
        @wine_review2.updated_at = 1.minute.from_now
        @wine_review2.save
      end
      it "returns taster's latest review" do
        expect(helper.taster_last_review(tasting, taster)).to eq @wine_review1
      end
    end
    describe "rating_sorted_tasting_wines" do
      before do
        self.create_wines(true)
      end
      it "returns all 5 tasting_wines" do
        expect(helper.rating_sorted_tasting_wines(tasting).count).to eq 5
      end
      it "returns tasting_wines with ratings in descending order" do
        tws = helper.rating_sorted_tasting_wines(tasting)
        expect(helper.avg_tasting_wine_rating(tws[0])).to be >= helper.avg_tasting_wine_rating(tws[1])
        expect(helper.avg_tasting_wine_rating(tws[1])).to be >= helper.avg_tasting_wine_rating(tws[2])
        expect(helper.avg_tasting_wine_rating(tws[2])).to be >= helper.avg_tasting_wine_rating(tws[3])
        expect(helper.avg_tasting_wine_rating(tws[3])).to be >= helper.avg_tasting_wine_rating(tws[4])
      end
    end
    describe "guest_rating_sorted_wine_reviews" do
      before do
        self.create_wines(true)
        @guest = tasting.guests.first
      end
      it "returns all 5 wine_reviews" do
        expect(helper.guest_rating_sorted_wine_reviews(@guest).count).to eq 5
      end
      it "returns wine_reviews with ratings in descending order" do
        wrs = helper.guest_rating_sorted_wine_reviews(@guest)
        expect(wrs[0].rating).to be >= wrs[1].rating
        expect(wrs[1].rating).to be >= wrs[2].rating
        expect(wrs[2].rating).to be >= wrs[3].rating
        expect(wrs[3].rating).to be >= wrs[4].rating
      end
    end
    describe "rating_fill_percent_for_tasting_wine" do
      before do
        self.create_wines(true)
        @tasting_wine = tasting.tasting_wines.first
      end
      it "returns percentage string" do
        rating = helper.avg_tasting_wine_rating(@tasting_wine)
        expect(helper.rating_fill_percent_for_tasting_wine(@tasting_wine)).to eq "#{100*rating/5}%"
      end
    end
    describe "rating_fill_color_for_rating" do
      it "returns 'bad' when rating < 3" do
        expect(helper.rating_fill_color_for_rating(1)).to eq 'bad'
        expect(helper.rating_fill_color_for_rating(2.9)).to eq 'bad'
      end
      it "returns 'ok' when rating >= 3 & < 4" do
        expect(helper.rating_fill_color_for_rating(3)).to eq 'ok'
        expect(helper.rating_fill_color_for_rating(3.9)).to eq 'ok'
      end
      it "returns 'good' when rating >= 4 & < 5" do
        expect(helper.rating_fill_color_for_rating(4)).to eq 'good'
        expect(helper.rating_fill_color_for_rating(4.9)).to eq 'good'
      end
      it "returns 'excellent' when rating = 5" do
        expect(helper.rating_fill_color_for_rating(5)).to eq 'excellent'
      end
    end
    describe "rating_fill_color_for_tasting_wine" do
      before do
        self.create_wines(true)
        @tasting_wine = tasting.tasting_wines.first
      end
      it "return correct style for average rating on tasting_wine" do
        rating = helper.avg_tasting_wine_rating(@tasting_wine)
        style = "excellent"
        if rating < 3
          style = "bad"
        elsif rating < 4
          style = "ok"
        elsif rating < 5
          style = "good"
        end
        expect(helper.rating_fill_color_for_tasting_wine(@tasting_wine)).to eq style
      end
    end
    describe "tasting_wine_from_wine_review" do
      before do
        self.create_wines(true)
        @wine_review = tasting.wine_reviews.first
      end
      it "returns tasting_wine with same wine_number" do
        tw = helper.tasting_wine_from_wine_review(@wine_review)
        expect(tw.wine_number).to eq @wine_review.wine_number
      end
    end
  end # END HOST CRUD context

end
