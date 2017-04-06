# == Schema Information
#
# Table name: snippets
#
#  id          :integer          not null, primary key
#  description :string
#  lang        :string           not null
#  abstract    :boolean          default("f")
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Snippet < ApplicationRecord
  has_many :snippet_versions, :dependent => :destroy
  belongs_to :lang
  accepts_nested_attributes_for :snippet_versions

  def actual
    self.snippet_versions.last
  end

  def to_s
    self.name
  end
end
