if Rails.env.production?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
    address:        'smtp.sendgrid.net',
    port:           '2525',
    authentication: :plain,
    user_name:      ENV['SENDGRID_USERNAME'],
    password:       ENV['SENDGRID_PASSWORD'],
    domain:         'heroku.com',
    enable_starttls_auto: true
  }
end

# if Rails.env.development?
#   ActionMailer::Base.delivery_method = :smtp
#   ActionMailer::Base.smtp_settings = {
#     user_name:      ENV['GMAIL_USERNAME'],
#     password:       ENV['GMAIL_PASSWORD'],
#     domain:         'smtp.gmail.com',
#     address:       'smtp.gmail.com',
#     port:          '587',
#     authentication: "plain",
#     openssl_verify_mode: 'none'
#   }
# end

if Rails.env.development?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
    address:        'smtp.sendgrid.net',
    port:           '587',
    authentication: :plain,
    user_name:      ENV['SENDGRID_USERNAME'],
    password:       ENV['SENDGRID_PASSWORD'],
    domain:         'localhost',
    enable_starttls_auto: true
  }
end
