
  class Alexa::AccessTokenFinder

    require 'open-uri'
    require 'json'

    def initialize(access_token)
      @access_token = access_token
      @amazon_user = nil
      @yno_user = nil
      @yno_host = nil
      @yno_taster = nil
    end

    def amazon_user
      return @amazon_user if @amazon_user.present?
      @amazon_user = JSON.parse(URI.parse("https://api.amazon.com/user/profile?access_token=#{@access_token}").read)
    end

    def yno_user
      return @yno_user if @yno_user.present?
      return nil unless self.amazon_user.present?
      @yno_user = User.find_by(email: @amazon_user["email"])
    end

    def yno_taster
      return @yno_taster if @yno_taster.present?
      return nil unless self.yno_user.present?
      @yno_taster = Taster.find_by(user_id: self.yno_user.id)
    end

    def yno_host
      return @yno_host if @yno_host.present?
      @yno_host = Host.find_by(amazon_access_token: @access_token)
      return @yno_host if @yno_host.present?
      return nil unless self.yno_taster.present?
      @yno_host = Host.find_by(taster_id: self.yno_taster.id)
      @yno_host.update(amazon_access_token: @access_token) if @yno_host.present?
      @yno_host
    end
  end
