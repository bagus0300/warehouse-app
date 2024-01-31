require "test_helper"

class ComponentControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get component_index_url
    assert_response :success
  end
end
