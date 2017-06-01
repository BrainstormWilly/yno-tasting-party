class TestsController < ActionController::Base

  def show
    render json: {
      'title' => 'hello world'
    }
  end

end
