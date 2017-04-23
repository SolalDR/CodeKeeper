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

class Snippet < ApplicationRecord
  has_many :snippet_versions
  belongs_to :lang
  belongs_to :user
  accepts_nested_attributes_for :snippet_versions

  def actual
    self.snippet_versions.last
  end

  def to_s
    self.name
  end
end
