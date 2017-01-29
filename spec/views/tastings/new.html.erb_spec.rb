require 'rails_helper'

RSpec.describe "tastings/new", type: :view do
  before(:each) do
    assign(:tasting, Tasting.new())
  end

  it "renders new tasting form" do
    render

    assert_select "form[action=?][method=?]", tastings_path, "post" do
    end
  end
end
