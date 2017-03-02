require 'test_helper'

class SnippetVersionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @snippet_version = snippet_versions(:one)
  end

  test "should get index" do
    get snippet_versions_url
    assert_response :success
  end

  test "should get new" do
    get new_snippet_version_url
    assert_response :success
  end

  test "should create snippet_version" do
    assert_difference('SnippetVersion.count') do
      post snippet_versions_url, params: { snippet_version: { content: @snippet_version.content, doc: @snippet_version.doc, version: @snippet_version.version } }
    end

    assert_redirected_to snippet_version_url(SnippetVersion.last)
  end

  test "should show snippet_version" do
    get snippet_version_url(@snippet_version)
    assert_response :success
  end

  test "should get edit" do
    get edit_snippet_version_url(@snippet_version)
    assert_response :success
  end

  test "should update snippet_version" do
    patch snippet_version_url(@snippet_version), params: { snippet_version: { content: @snippet_version.content, doc: @snippet_version.doc, version: @snippet_version.version } }
    assert_redirected_to snippet_version_url(@snippet_version)
  end

  test "should destroy snippet_version" do
    assert_difference('SnippetVersion.count', -1) do
      delete snippet_version_url(@snippet_version)
    end

    assert_redirected_to snippet_versions_url
  end
end
