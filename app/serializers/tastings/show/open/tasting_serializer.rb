class Tastings::Show::Open::TastingSerializer < ActiveModel::Serializer
  attributes :id,
    :close_at,
    :closed_at,
    :completed_at,
    :description,
    :guests,
    :host,
    :host_id,
    :host_is_not_tasting,
    :location,
    :location_id,
    :name,
    :open_at,
    :is_open,
    :is_pending,
    :is_closed,
    :is_completed,
    :taster_progress,
    :tasting_wines,
    :taster_wine_reviews,
    :tasting_progress

  def guests
    object.guests.map do |g|
      Tastings::Show::Open::GuestSerializer.new(g)
    end
  end

  def host
    Tastings::Show::Open::HostSerializer.new(object.host)
  end

  def host_is_not_tasting
    object.guests.select{ |g| g.taster.user_id==object.host.taster.user_id }.count==0
  end

  def location
    ::LocationSerializer.new(object.location)
  end

  def taster_progress
    guest = object.guests.select{ |g| g.taster.user_id==current_user.id }.first
    return 0 unless guest
    Tastings::Show::Open::GuestSerializer.new(guest).tasting_progress
  end

  def tasting_wines
    object.tasting_wines.map do |tw|
      ::TastingWineSerializer.new(tw)
    end
  end

  def taster_wine_reviews
    # if host is not tasting we need a guest user to get average ratings for each wine
    if object.host.taster.user==current_user && host_is_not_tasting
      this_user = object.guests.first.taster.user
    else
      this_user = current_user
    end
    object.wine_reviews
      .select{ |wr| wr.taster.user_id==this_user.id }
      .map{ |wr| ::WineReviewSerializer.new(wr) }
  end

  def tasting_progress
    total = object.wine_reviews.count
    return 0 if total==0
    unrated = object.wine_reviews.select{ |wr| wr.unrated? }.count
    (total-unrated)/total.to_f
  end



  # def wine_reviews
  #   object.wine_reviews.map{ |wr| ::WineReviewSerializer.new(wr) }
  # end

  def is_open
    object.is_open?
  end

  def is_pending
    object.is_pending?
  end

  def is_closed
    object.is_closed? && !object.is_completed?
  end

  def is_completed
    object.is_completed?
  end



  # private
  #
  #   def current_taster
  #     Taster.find_by(user_id: current_user.id)
  #   end

end
