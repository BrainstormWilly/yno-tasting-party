FactoryGirl.define do
  factory :host do
    taster nil
    phone Faker::PhoneNumber.phone_number
  end
end
