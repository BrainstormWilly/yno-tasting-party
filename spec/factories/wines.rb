FactoryBot.define do
  factory :wine do
    vintage { (1995..1.year.ago.year).to_a.sample }
    name { Faker::Lorem.sentence }
  end
end
