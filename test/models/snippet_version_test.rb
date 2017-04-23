# == Schema Information
#
# Table name: snippet_versions
#
#  id         :integer          not null, primary key
#  content    :text             not null
#  version    :string           default("1.0.0"), not null
#  doc        :string
#  comment    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  snippet_id :integer
#

require 'test_helper'

class SnippetVersionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
