FactoryGirl.define do
  coin = [true,false,false]
  factory :location do
    phone Faker::PhoneNumber.phone_number
    address Faker::Address.street_address
    address2 coin.sample ? Faker::Address.secondary_address : nil
    city Faker::Address.city
    postal Faker::Address.postcode
    country "US"
  end
end
