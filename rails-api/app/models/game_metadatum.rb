class GameMetadatum < ApplicationRecord
  self.primary_key = :name
  # belongs_to :goat, class_name: 'GameMetadatum', :foreign_key => "name"
  belongs_to :metadata, polymorphic: true, :foreign_key => "name"
end
