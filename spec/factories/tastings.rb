FactoryGirl.define do
  factory :tasting do
    name "#{Faker::Lorem.words(2)} tasting"
    open_at DateTime.now
    close_at 4.hours.from_now
    description Faker::Lorem.sentences([1..5].sample)
    host_id nil
  end
end
