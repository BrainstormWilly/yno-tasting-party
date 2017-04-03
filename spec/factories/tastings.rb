FactoryGirl.define do
  factory :tasting do
    name "#{Faker::Lorem.words(2)} tasting"
    open_at 1.hour.from_now
    close_at nil
    closed_at nil
    completed_at nil
    description Faker::Lorem.sentences([1..5].sample)
    location_id nil
    host_id nil
  end
end
