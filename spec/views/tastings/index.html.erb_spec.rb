require 'rails_helper'

RSpec.describe "tastings/index", type: :view do
  before(:each) do
    assign(:tastings, [
      Tasting.create!(),
      Tasting.create!()
    ])
  end

  it "renders a list of tastings" do
    render
  end
end
