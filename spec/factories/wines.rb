FactoryGirl.define do
  factory :wine do
    vintage (1995..2015).to_a.sample
    name Faker::Lorem.sentence
  end
end
