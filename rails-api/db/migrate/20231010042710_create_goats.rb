class CreateGoats < ActiveRecord::Migration[7.1]
  def change
    create_table :goat, primary_key: %i[filename listyear publication rank name weightedpoints] do |t|
      t.text :filename
      t.text :listyear
      t.text :publication
      t.text :listtype
      t.integer :rank
      t.text :name
      t.decimal :weightedpoints
      t.boolean :isranked
      t.text :notes
    end
    add_foreign_key 'goat', 'game_metadata', column: 'name', primary_key: 'name'
  end
end
