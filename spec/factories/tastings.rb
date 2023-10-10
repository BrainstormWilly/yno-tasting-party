FactoryBot.define do
  factory :tasting do
    name { "#{Faker::Lorem.words.join(" ")} tasting" }
    open_at {1.hour.from_now}
    close_at {nil}
    closed_at {nil}
    completed_at {nil}
    description { Faker::Lorem.paragraph }
    location_id {nil}
    host_id {nil}
  end
end
