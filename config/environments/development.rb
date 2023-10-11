
Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  console do
    require "pry"
    config.console = Pry
  end

  # In the development environment your application"s code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don"t have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = true

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=172800"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Mailtrip Test Settings
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_caching = false
  config.action_mailer.default_url_options = { host: "localhost", port: 3000, protocol: "http" }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    :user_name => ENV.fetch("MAILTRAP_USERNAME"),
    :password => ENV.fetch("MAILTRAP_PASSWORD"),
    :address => 'sandbox.smtp.mailtrap.io',
    :host => 'sandbox.smtp.mailtrap.io',
    :port => '2525',
    :authentication => :cram_md5
  }
  # config.action_mailer.delivery_method = :smtp
  # config.action_mailer.smtp_settings = {
  #   :user_name => "apikey", # This is the string literal "apikey", NOT the ID of your API key
  #   :password => ENV.fetch("SENDGRID_API_KEY"), # This is the secret sendgrid API key which was issued during API key creation
  #   :domain => "localhost:3000",
  #   :address => "smtp.sendgrid.net",
  #   :port => 2525,
  #   :authentication => :plain,
  #   :enable_starttls_auto => true
  # }


  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "*"
      resource "*",
        headers: :any,
        expose: ["access-token", "expiry", "token-type", "uid", "client"],
        methods: [:get, :put, :patch, :post, :options, :delete]
    end
  end

  config.server_timing = true
end
