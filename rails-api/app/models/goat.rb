class Goat < ApplicationRecord
  self.table_name = "goat"
  has_many :game_metadata, :as => :metadata, :foreign_key => "name"
end
