require "test_helper"

class Api::UserControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_user_index_url
    assert_response :success
  end
end
