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
  handle: "WillyTheYno"
)


#########################################################
####################### TASTINGS ########################
#########################################################

# Current tasting invitation for taster_me
tasting_me = Tasting.create(
  name: "Pinot or PinYes",
  description: "Pinots around the world",
  open_at: DateTime.now,
  close_at: 4.hours.from_now
)
tasting_taster_me = TasterTasting.create(
  tasting_id: tasting_me.id,
  taster_id: taster_me.id
)

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
