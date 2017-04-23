# == Schema Information
#
# Table name: snippets
#
#  id          :integer          not null, primary key
#  description :string
#  abstract    :boolean          default("false")
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  lang_id     :integer
#  user_id     :integer
#

require 'test_helper'

class SnippetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
