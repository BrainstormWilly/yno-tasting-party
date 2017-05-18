FactoryGirl.define do
  factory :tasting_wine do
    tasting nil
    wine nil
    sequence(:wine_number){|n| n }
  end
end
