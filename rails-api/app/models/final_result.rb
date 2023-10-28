class FinalResult < ApplicationRecord
  self.primary_key = :rank, :name
  self.table_name = 'finalResults'
  has_many :game_metadata, as: :metadata, foreign_key: 'name'
end
