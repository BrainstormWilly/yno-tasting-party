FactoryBot.define do
  factory :wine_review do
    tasting {nil}
    taster {nil}
    wine {nil}
    wine_number {1}
    rating {3}
    comments {Faker::Lorem.sentence}
  end
end
