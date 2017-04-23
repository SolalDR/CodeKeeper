# == Schema Information
#
# Table name: langs
#
#  id         :integer          not null, primary key
#  cd         :text             not null
#  cdMirror   :string           default("javascript")
#  lib        :string           not null
#  bgColor    :string           not null
#  color      :string           default("#FFFFFF"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Lang < ApplicationRecord
  has_many :snippets
end
