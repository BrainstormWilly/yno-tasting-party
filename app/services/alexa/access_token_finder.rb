
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
      return @amazon_user unless @amazon_user.nil?
      response = JSON.parse(URI.parse("https://api.amazon.com/user/profile?access_token=#{@access_token}").read)
      @amazon_user = response unless response['email'].nil?
      # p "@@@@@@@@@ amazon_user: #{@amazon_user}"
      # @amazon_user
    end

    def yno_user
      return @yno_user if @yno_user.present?
      return if amazon_user.nil?
      @yno_user = User.find_by(email: @amazon_user["email"])
      # p "@@@@@@@@@ yno_user: #{@yno_user}"
      # @yno_user
    end

    def yno_taster
      return @yno_taster if @yno_taster.present?
      return unless yno_user.present?
      @yno_taster = Taster.find_by(user_id: self.yno_user.id)
      # p "@@@@@@@@ yno_taster: #{@yno_taster}"
      # @yno_taster
    end

    def yno_host
      return @yno_host if @yno_host.present?
      @yno_host = Host.find_by(amazon_access_token: @access_token)
      return @yno_host if @yno_host.present?
      return unless yno_taster.present?
      @yno_host = Host.find_by(taster_id: yno_taster.id)
      @yno_host.update(amazon_access_token: @access_token) if @yno_host.present?
      # p "@@@@@@@@@ yno_host: #{@yno_host}"
      @yno_host
    end
  end
