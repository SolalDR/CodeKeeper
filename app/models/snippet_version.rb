# == Schema Information
#
# Table name: snippet_versions
#
#  id         :integer          not null, primary key
#  content    :text             not null
#  version    :string           not null
#  doc        :string
#  comment    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  snippet_id :integer
#

class SnippetVersion < ApplicationRecord
  belongs_to :snippet
  VERSION_TYPE = ["big", "medium", "small"]

  def type_version=(version)
    version = version.to_i
    if (0..2).include? version
      current_version = self.snippet.snippet_versions.last.version.split(".").map{ |v| v.to_i }
      current_version[version]+= 1
      self.version = current_version.join(".")
    end
  end
  def type_version
  end
end
