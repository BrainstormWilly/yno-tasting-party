
if Rails.env.development?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
    :user_name => ENV.fetch("SENDGRID_USERNAME"),
    :password => ENV.fetch("SENDGRID_PASSWORD"),
    :address => 'sandbox.smtp.mailtrap.io',
    :host => 'sandbox.smtp.mailtrap.io',
    :port => '2525',
    :authentication => :cram_md5
  }
end

