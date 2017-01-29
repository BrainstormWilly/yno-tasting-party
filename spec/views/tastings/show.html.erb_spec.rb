require 'rails_helper'

RSpec.describe "tastings/show", type: :view do
  before(:each) do
    @tasting = assign(:tasting, Tasting.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
