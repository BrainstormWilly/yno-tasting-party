class ApplicationMailer < ActionMailer::Base
  include ApplicationHelper
  helper :application
  
  default from: 'support@ynotasting.com'
  layout 'mailer'
end
