require 'rails_helper'

RSpec.describe "tastings/edit", type: :view do
  before(:each) do
    @tasting = assign(:tasting, Tasting.create!())
  end

  it "renders the edit tasting form" do
    render

    assert_select "form[action=?][method=?]", tasting_path(@tasting), "post" do
    end
  end
end
