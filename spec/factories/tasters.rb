FactoryBot.define do
  first_name = Faker::Name.first_name
  factory :taster do
    user {nil}
    name {"#{first_name} #{Faker::Name.last_name}"}
    handle {first_name}
  end
end
