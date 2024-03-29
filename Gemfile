source 'https://rubygems.org'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'dotenv-rails'
  # gem 'byebug', platform: :mri
  gem 'pry', '~> 0.14.2'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  # gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'rspec-rails'
  gem 'rails-controller-testing'
  gem 'shoulda-matchers', '~> 5.0'
  gem 'faker'
  gem 'factory_bot_rails'
  gem 'date_validator'
end

group :development do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.5'
  # homebrew libreadline fix
  gem 'rb-readline'
  # allow CORS authorization between localhost ports
  gem 'rack-cors'
end

group :production do
  gem 'pg'
  gem 'rails_12factor'

end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0'
# Use Puma as the app server
gem 'puma', '~> 3.0'

# Use SCSS for stylesheets (removed with introduction of AngularJS)
# gem 'sass-rails', '~> 5.0'
gem 'sassc-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
# Client timezone lookup
gem 'geocoder'
gem 'timezone', '~> 1.0'

# Bootstrap 3
gem 'bootstrap-sass'

# Bootstrap DateTimePicker
gem 'momentjs-rails', '>= 2.9.0'
gem 'bootstrap3-datetimepicker-rails', '~> 4.17.43'

# Devise 4
gem 'devise'
gem 'devise_invitable'
gem 'omniauth', '>= 1.0.0'
gem 'devise_token_auth'

# Mailtrap email
# gem 'sendgrid-ruby'
gem 'mailtrap'

# API Serialization
gem 'active_model_serializers', '~> 0.10.0'

# Alexa Authentication
gem 'alexa_verifier', '~> 1.0'
gem 'doorkeeper', '~> 5.6'

gem 'psych', '< 4.0'

ruby '3.2.2'
