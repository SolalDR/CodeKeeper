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
  VERSION_TYPE = [["big", 0], ["medium", 1], ["small", 2]]
  belongs_to :snippet

  def type_version=(version)
    version = version.to_i
    last = self.snippet.snippet_versions.last
    if last
      current_version = last.version.split(".").map{ |v| v.to_i }
      if (0..2).include? version
        current_version[version]+= 1
        self.version = current_version.join(".")
      end
    else
      self.version = "1.0.0"
    end
  end
  
  def type_version
  end

  def getVersionType
    return self.VERSION_TYPE
  end
end
