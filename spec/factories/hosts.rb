FactoryGirl.define do
  factory :host do
    taster nil
    amazon_id "amzn1.account.#{Faker::Crypto.md5}"
  end
end
