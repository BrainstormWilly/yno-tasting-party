class User < ApplicationRecord

  # Include default devise modules.
  devise :invitable, :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable

  include DeviseTokenAuth::Concerns::User

  has_one :taster

  # For custom invitation mailer
  attr_reader :raw_invitation_token


end
