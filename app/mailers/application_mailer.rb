class ApplicationMailer < ActionMailer::Base
  include ApplicationHelper
  helper :application
  
  default from: 'do-not-reply@ynotasting.com'
  layout 'mailer'
end
