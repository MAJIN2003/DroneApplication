require "test_helper"

class DronsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @dron = drons(:one)
  end

  test "should get index" do
    get drons_url, as: :json
    assert_response :success
  end

  test "should create dron" do
    assert_difference("Dron.count") do
      post drons_url, params: { dron: { altitude: @dron.altitude, current: @dron.current, fligt_mode: @dron.fligt_mode, latitude: @dron.latitude, longitude: @dron.longitude, speed: @dron.speed, voltage: @dron.voltage } }, as: :json
    end

    assert_response :created
  end

  test "should show dron" do
    get dron_url(@dron), as: :json
    assert_response :success
  end

  test "should update dron" do
    patch dron_url(@dron), params: { dron: { altitude: @dron.altitude, current: @dron.current, fligt_mode: @dron.fligt_mode, latitude: @dron.latitude, longitude: @dron.longitude, speed: @dron.speed, voltage: @dron.voltage } }, as: :json
    assert_response :success
  end

  test "should destroy dron" do
    assert_difference("Dron.count", -1) do
      delete dron_url(@dron), as: :json
    end

    assert_response :no_content
  end
end
