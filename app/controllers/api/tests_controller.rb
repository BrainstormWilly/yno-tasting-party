class Api::TestsController < ActionController::Base

  def show
    render json: {
      'title' => "You've got Rails!"
    }
  end

end
