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

user_me = User.create(
  email: "bill@ynoguy.com",
  password: "123456",
  password_confirmation: "123456"
)

taster_me = Taster.create(
  user_id: user_me.id,
  name: "Bill Langley",
  handle: "WillyTheYno",
  status: "active"
)

host_me = Host.create(
  taster_id: taster_me.id
)


10.times do
  user = User.create(
    email: Faker::Internet.email,
    password: "123456",
    password_confirmation: "123456"
  )
  taster = Taster.create(
    name: Faker::Name.name,
    user_id: user.id,
    handle: Faker::Name.first_name,
    status: "active"
  )
  Connection.create(
    taster_id: taster.id,
    host_id: host_me.id,
    connected_at: Time.current
  )
end






#########################################################
####################### LOCATIONS #######################
#########################################################

loc1 = Location.create(
  phone: "707-237-6904",
  address: "2110 Creekside Road",
  city: "Santa Rosa",
  state: "CA",
  postal: "95405",
  time_zone: "-8"
)
loc2 = Location.create(
  phone: "408-314-4304",
  address: "2110 Creekside Road",
  city: "Santa Rosa",
  state: "CA",
  postal: "95405",
  time_zone: "-8"
)
HostLocation.create(
  host_id: host_me.id,
  location_id: loc1.id
)
HostLocation.create(
  host_id: host_me.id,
  location_id: loc2.id
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
wine_sufs = ["Family Vineyards", "Cellars", "Estates", "Winery"]


20.times do
  Wine.create(
    vintage: vintages.sample,
    name: "#{Faker::Name.last_name} #{wine_sufs.sample} #{regions.sample} #{varietals.sample}"
  )
end


#########################################################
####################### TASTINGS ########################
#########################################################

# FUTURE TASTING
tasters = Taster.all.to_a.shuffle
wines = Wine.all.to_a.shuffle
prices = (9..60).to_a
tasting_future = Tasting.create(
  host_id: host_me.id,
  name: "Pinot or PinYes",
  description: "Pinots around the world",
  location_id: host_me.primary_location.id,
  open_at: 40.hours.from_now,
  close_at: 44.hours.from_now,
  private: true
)
# future tasting wines
6.times do |i|
  TastingWine.create(
    wine_id: wines.pop.id,
    tasting_id: tasting_future.id,
    price: prices.sample
  )
end
# future tasting tasters (confirmed)
3.times do
  tt = Guest.create(
    tasting_id: tasting_future.id,
    taster_id: tasters.pop.id,
    confirmed: Time.current
  )
  WineReview.create_all_for_guest(tasting_future, tt.taster)
end
# future tasting tasters (unconfirmed)
2.times do
  tt = Guest.create(
    tasting_id: tasting_future.id,
    taster_id: tasters.pop.id,
    invited: Time.current
  )
  # WineReview.create_all_for_guest(tasting_future, tt.taster)
end

# PRESENT TASTING 1 (Host is Guest)
tasters = Taster.where.not(id:taster_me.id).to_a.shuffle
wines = Wine.all.to_a.shuffle
tasting_present_1 = Tasting.create(
  host_id: host_me.id,
  name: "Bordeaux or Not",
  description: "Is it Bordeaux or is it not",
  location_id: host_me.primary_location.id,
  open_at: Time.current,
  private: true
)
# present tasting 1 wines
6.times do |i|
  TastingWine.create(
    wine_id: wines.pop.id,
    tasting_id: tasting_present_1.id,
    price: prices.sample
  )
end
# present tasting 1 guests (confirmed)
5.times do
  tt = Guest.create(
    tasting_id: tasting_present_1.id,
    taster_id: tasters.pop.id,
    confirmed: Time.current
  )
  6.times do |i|
    wr = WineReview.create({
      tasting_id: tasting_present_1.id,
      taster_id: tt.taster.id,
      rating: (1..5).to_a.sample,
      wine_number: i+1
    })
    wr.updated_at = 1.second.from_now if wr.rating!=3
    wr.save
  end
end
# present tasting 1 add host as guest
Guest.create(
  tasting_id: tasting_present_1.id,
  taster_id: taster_me.id,
  confirmed: Time.current
)
6.times do |i|
  wr = WineReview.create({
    tasting_id: tasting_present_1.id,
    taster_id: taster_me.id,
    rating: (1..5).to_a.sample,
    wine_number: i+1
  })
  wr.updated_at = 1.second.from_now if wr.rating!=3
  wr.save
end


# PRESENT TASTING 2 (Host not Guest)
tasters = Taster.where.not(id:taster_me.id).to_a.shuffle
wines = Wine.all.to_a.shuffle
tasting_present_2 = Tasting.create(
  host_id: host_me.id,
  name: "Santa Cruz Chardonnays",
  description: "Great chardonnays from the Santa Cruz Mountain AVA",
  location_id: host_me.primary_location.id,
  open_at: Time.current,
  private: true
)
# present tasting 2 wines
6.times do |i|
  TastingWine.create(
    wine_id: wines.pop.id,
    tasting_id: tasting_present_2.id,
    price: prices.sample
  )
end
# present tasting 2 guests (confirmed)
6.times do
  tt = tasters.pop
  Guest.create(
    tasting_id: tasting_present_2.id,
    taster_id: tt.id,
    confirmed: Time.current
  )
  6.times do |i|
    wr = WineReview.create({
      tasting_id: tasting_present_2.id,
      taster_id: tt.id,
      rating: (1..5).to_a.sample,
      wine_number: i+1
    })
    wr.updated_at = 1.second.from_now if wr.rating!=3
    wr.save
  end
end

# CLOSED TASTING
tasters = Taster.all.to_a.shuffle
wines = Wine.all.to_a.shuffle
tasting_past = Tasting.create(
  host_id: host_me.id,
  name: "White out",
  description: "Which white wine is it?",
  location_id: host_me.primary_location.id,
  open_at: 40.hours.ago,
  closed_at: 37.hours.ago,
  private: true
)
# past tasting wines
6.times do |i|
  TastingWine.create(
    wine_id: wines.pop.id,
    tasting_id: tasting_past.id,
    price: prices.sample
  )
end
# past tasting guests (confirmed)
5.times do
  tt = Guest.create(
    tasting_id: tasting_past.id,
    taster_id: tasters.pop.id,
    confirmed: 5.days.ago
  )
  6.times do |i|
    wr = WineReview.create({
      tasting_id: tasting_past.id,
      taster_id: tt.taster.id,
      rating: (1..5).to_a.sample,
      wine_number: i+1
    })
    wr.created_at = 40.hours.ago
    wr.updated_at = 38.hours.ago
    wr.save
  end
end

# COMPLETED TASTING
tasters = Taster.all.to_a.shuffle
wines = Wine.all.to_a.shuffle
tasting_completed = Tasting.create(
  host_id: host_me.id,
  name: "Just Cabs",
  description: "Cabs from around the world",
  location_id: host_me.primary_location.id,
  open_at: 40.hours.ago,
  close_at: 37.hours.ago,
  completed_at: 36.hours.ago,
  private: true
)
# completed tasting guests (confirmed)
5.times do
  tt = Guest.create(
    tasting_id: tasting_completed.id,
    taster_id: tasters.pop.id,
    confirmed: 5.days.ago
  )
  6.times do |i|
    WineReview.create({
      tasting_id: tasting_completed.id,
      taster_id: tt.taster.id,
      rating: (1..5).to_a.sample,
      wine_id: wines[i].id,
      wine_number: i+1,
      created_at: 40.hours.ago,
      updated_at: 38.hours.ago
    })
  end
end
# completed tasting wines
6.times do |i|
  TastingWine.create(
    wine_id: wines[i].id,
    tasting_id: tasting_completed.id,
    wine_number: i+1,
    average_rating: WineReview.where(tasting_id:tasting_completed.id, wine_number:i+1).first.average_rating,
    price: prices.sample
  )
end


#########################################################
################## UNCONNECTED USER #####################
#########################################################

gmail_user_me = User.create(
  email: "brainstormwilly@gmail.com",
  password: "123456",
  password_confirmation: "123456"
)

gmail_taster_me = Taster.create(
  user_id: gmail_user_me.id,
  name: "William Langley",
  handle: "Brainstorm Willy",
  status: "active"
)

gmail_host_me = Host.create(
  taster_id: gmail_taster_me.id,
)
