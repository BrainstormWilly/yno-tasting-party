require 'rails_helper'
require 'action_view'


RSpec.describe Tasting, type: :model do

  include ActionView::Helpers::DateHelper

  let(:user){ create(:user) }
  let(:taster){ create(:taster, user: user) }
  let(:host){ create(:host, taster: taster) }
  let(:tasting){ create(:tasting, host: host) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_least(1) }
  it { is_expected.to validate_presence_of(:open_at) }

  describe "attributes" do
    it "should have name, description, open_at, close_at, closed_at, and completed_at attributes" do
      expect(tasting).to have_attributes(name: tasting.name, description: tasting.description, open_at: tasting.open_at, close_at: tasting.close_at, closed_at: tasting.closed_at, completed_at: tasting.completed_at)
    end
  end

  describe "private" do
    it "should respond to private?" do
      expect(tasting).to respond_to(:private?)
    end
    it "should default private to falsey" do
      expect(tasting.private).to be_falsey
    end
  end

  describe "is_open?" do
    context "future tastings" do
      it "should be false" do
        expect(tasting.is_open?).to be_falsey
      end
    end
    context "for present tastings" do
      before do
        tasting.open_at = 2.hours.ago
        tasting.close_at = 2.hours.from_now
      end
      it "should be true" do
        expect(tasting.is_open?).to be_truthy
      end
    end
    context "for expired tastings" do
      before do
        tasting.open_at = 2.hours.ago
        tasting.close_at = 1.hour.ago
        guest = create(:guest, tasting: tasting, taster: taster)
        wine = create(:wine)
        tasting_wine = create(:tasting_wine, wine: wine, tasting: tasting)
        @review = create(:wine_review, wine: wine, tasting: tasting, taster: taster)
      end
      context "with unrated reviews" do
        it "should be true" do
          expect(tasting.is_open?).to be_truthy
        end
      end
      context "with all reviews rated" do
        before do
          @review.updated_at = 1.minute.from_now
          @review.save
        end
        it "should be false" do
          expect(tasting.is_open?).to be_falsey
        end
      end
    end
    context "force-closed tastings" do
      before do
        tasting.closed_at = Time.current
      end
      it "should be false" do
        expect(tasting.is_open?).to be_falsey
      end
    end
    context "completed tastings" do
      before do
        tasting.completed_at = Time.current
      end
      it "should be false" do
        expect(tasting.is_open?).to be_falsey
      end
    end
  end

  describe "is_closed?" do
    context "for future tastings" do
      it "should be false" do
        expect(tasting.is_closed?).to be_falsey
      end
    end
    context "for present tastings" do
      before do
        tasting.open_at = Time.current
        tasting.close_at = 2.hours.from_now
      end
      it "should be false" do
        expect(tasting.is_closed?).to be_falsey
      end
    end
    context "for expired tastings" do
      before do
        tasting.open_at = 2.hours.ago
        tasting.close_at = 1.hour.ago
        guest = create(:guest, tasting: tasting, taster: taster)
        wine = create(:wine)
        tasting_wine = create(:tasting_wine, wine: wine, tasting: tasting)
        @review = create(:wine_review, wine: wine, tasting: tasting, taster: taster)
      end
      context "with unrated reviews" do
        it "should be false" do
          expect(tasting.is_closed?).to be_falsey
        end
      end
      context "with all reviews rated" do
        before do
          @review.updated_at = 1.minute.from_now
          @review.save
        end
        it "should be true" do
          expect(tasting.is_closed?).to be_truthy
        end
      end
      context "force-closed tastings" do
        before do
          tasting.closed_at = Time.current
        end
        it "should be true" do
          expect(tasting.is_closed?).to be_truthy
        end
      end
      context "completed tastings" do
        before do
          tasting.completed_at = Time.current
        end
        it "should be true" do
          expect(tasting.is_closed?).to be_truthy
        end
      end
    end
  end

  describe "is_completed?" do
    context "for future tastings" do
      it "should be false" do
        expect(tasting.is_completed?).to be_falsey
      end
    end
    context "for present tastings" do
      before do
        tasting.open_at = Time.current
        tasting.close_at = 2.hours.from_now
      end
      it "should be false" do
        expect(tasting.is_completed?).to be_falsey
      end
    end
    context "for expired tastings" do
      before do
        tasting.open_at = 2.hours.ago
        tasting.close_at = 1.hour.ago
        guest = create(:guest, tasting: tasting, taster: taster)
        wine = create(:wine)
        tasting_wine = create(:tasting_wine, wine: wine, tasting: tasting)
        @review = create(:wine_review, wine: wine, tasting: tasting, taster: taster)
      end
      context "with unrated reviews" do
        it "should be false" do
          expect(tasting.is_completed?).to be_falsey
        end
      end
      context "with all reviews rated" do
        before do
          @review.updated_at = 1.minute.from_now
          @review.save
        end
        it "should be false" do
          expect(tasting.is_completed?).to be_falsey
        end
      end
    end
    context "for force-closed tastings" do
      before do
        tasting.open_at = 1.hour.ago
        tasting.close_at = 1.hour.from_now
        tasting.closed_at = Time.current
        guest = create(:guest, tasting: tasting, taster: taster)
        wine = create(:wine)
        tasting_wine = create(:tasting_wine, wine: wine, tasting: tasting)
      end
      it "should be false" do
        expect(tasting.is_completed?).to be_falsey
      end
    end
    context "for completed tastings" do
      before do
        tasting.completed_at = Time.current
      end
      it "should be true" do
        expect(tasting.is_completed?).to be_truthy
      end
    end
  end

  describe "has_rated_reviews?" do
    before do
      wine1 = create(:wine)
      tasting_wine1 = create(:tasting_wine, wine: wine1, tasting: tasting)
      @review1 = create(:wine_review, wine: wine1, tasting: tasting, taster: taster)
      wine2 = create(:wine)
      tasting_wine2 = create(:tasting_wine, wine: wine2, tasting: tasting)
      review2 = create(:wine_review, wine: wine2, tasting: tasting, taster: taster)
    end
    context "when all unrated" do
      it "should be false" do
        expect(tasting.has_rated_reviews?).to be_falsey
      end
    end
    context "when at least 1 rated" do
      before do
        @review1.updated_at = 1.minute.from_now
        @review1.save
      end
      it "should be true" do
        expect(tasting.has_rated_reviews?).to be_truthy
      end
    end
  end

  describe "has_unrevealed_wines?" do
    before do
      wine1 = create(:wine)
      tasting_wine1 = create(:tasting_wine, wine: wine1, tasting: tasting)
      review1 = create(:wine_review, wine: wine1, tasting: tasting, taster: taster)
      wine2 = create(:wine)
      tasting_wine2 = create(:tasting_wine, wine: wine2, tasting: tasting)
      review2 = create(:wine_review, wine: wine2, tasting: tasting, taster: taster)
    end
    context "for future tastings" do

    end
    context "for present tastings" do

    end
    context "for closed tastings" do

    end
    context "for completed tastings" do

    end
  end

  describe "status" do
    context "for future tastings" do
      it "should be time to open" do
        expect(tasting.status).to eq "Opens in #{distance_of_time_in_words(Time.current, tasting.open_at)}"
      end
    end
    context "for present tastings" do
      before do
        tasting.open_at = Time.current
        tasting.close_at = 2.hours.from_now
      end
      it "should be 'Open'" do
        expect(tasting.status).to eq "Open"
      end
    end
    context "for closed tastings" do
      before do

        tasting.closed_at = Time.current
        p "@@@@@@@@@@@ Completed? #{tasting.is_completed?}"
      end
      it "should be 'Closed'" do
        expect(tasting.status).to eq "Closed"
      end
    end
    context "for completed tastings" do
      before do
        tasting.completed_at = Time.current
      end
      it "should be 'Completed'" do
        expect(tasting.status).to eq "Completed"
      end
    end

    # describe "is_the_last_reveal?" do
    #   before do
    #     wine1 = create(:wine)
    #     @tasting_wine1 = create(:tasting_wine, wine: wine1, tasting: tasting)
    #     review1 = create(:wine_review, wine: wine1, tasting: tasting, taster: taster)
    #     wine2 = create(:wine)
    #     @tasting_wine2 = create(:tasting_wine, wine: wine2, tasting: tasting)
    #     review2 = create(:wine_review, wine: wine2, tasting: tasting, taster: taster)
    #   end
    #   context "when none revealed" do
    #     it "should be false" do
    #       expect(tasting.is_the_last_reveal?(@tasting_wine1)).to be_falsey
    #     end
    #   end
    #   context "when one reveal left but replacing another" do
    #     before do
    #       @tasting_wine1.wine_number = 1
    #       @tasting_wine1.save
    #     end
    #     it "should be false" do
    #       expect(tasting.is_the_last_reveal?(@tasting_wine1)).to be_falsey
    #     end
    #   end
    #   context "when revealing the last wine" do
    #     before do
    #       @tasting_wine1.wine_number = 1
    #       @tasting_wine1.save
    #     end
    #     it "should be true" do
    #       expect(tasting.is_the_last_reveal?(@tasting_wine2)).to be_truthy
    #     end
    #   end
    # end
  end


end
