FactoryGirl.define do
  factory :admin do
    user nil
    name Faker::Name.first_name
  end
end
