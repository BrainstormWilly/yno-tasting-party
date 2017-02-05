# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#########################################################
######################### USERS #########################
#########################################################

5.times do
  user = User.create(
    email: Faker::Internet.email,
    password: "123456",
    password_confirmation: "123456"
  )
  taster = Taster.create(
    name: Faker::Name.name,
    user_id: user.id,
    handle: user.email
  )
end
users = User.all
tasters = Taster.all

user_me = User.create(
  email: "bill@ynoguy.com",
  password: "123456",
  password_confirmation: "123456"
)


taster_me = Taster.create(
  user_id: user_me.id,
  name: "Bill Langley",
  handle: "WillyTheYno"
)

host_me = Host.create(
  taster_id: taster_me.id,
  phone: "707-237-6904"
)


#########################################################
######################### WINES #########################
#########################################################

regions = [
  "California",
  "Russian River",
  "Napa Valley",
  "Walla Walla",
  "Knights Valley",
  "Santa Maria",
  "Lodi"
]
varietals = [
  "Pinot Noir",
  "Cabernet Sauvignon",
  "Merlot",
  "Syrah",
  "Chardonnay",
  "Sauvignon Blanc",
  "Riesling"
]
vintages = (2000..2014).to_a
prices = (9..60).to_a
wine_sufs = ["Family Vineyards", "Cellars", "Estates", "Winery"]


20.times do
  Wine.create(
    price: prices.sample,
    vintage: vintages.sample,
    name: "#{Faker::Name.last_name} #{wine_sufs.sample} #{regions.sample} #{varietals.sample}"
  )
end


#########################################################
####################### TASTINGS ########################
#########################################################

# host taster_me tasting
tasting_me = Tasting.create(
  host_id: host_me.id,
  name: "Pinot or PinYes",
  description: "Pinots around the world",
  open_at: DateTime.now,
  close_at: 4.hours.from_now
)
tasting_taster_me = TasterTasting.create(
  tasting_id: tasting_me.id,
  taster_id: taster_me.id
)

# Host taster_me tasting wines
tasting_wines = Wine.all
6.times do |i|
  TastingWine.create(
    wine_id: tasting_wines.shuffle.pop.id,
    tasting_id: tasting_me.id
  )
end

# Public tastings
2.times do
  Tasting.create(
    name: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    open_at: Faker::Date.between(DateTime.now, 2.days.from_now),
    close_at: Faker::Date.between(2.days.from_now, 3.days.from_now),
    private: false
  )
end
