class ApplicationMailer < ActionMailer::Base
  include ApplicationHelper
  helper :application
  
  default from: 'bill@ynoguy.com'
  layout 'mailer'
end
