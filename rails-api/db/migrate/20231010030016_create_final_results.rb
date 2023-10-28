class CreateFinalResults < ActiveRecord::Migration[7.1]
  def change
    create_table :finalResults, primary_key: %i[rank name] do |t|
      t.integer :rank
      t.text :name
      t.float :totalscore
      t.integer :numoflists
      t.integer :avglistyear
    end
    add_foreign_key :finalResults, :game_metadata, column: :name, primary_key: 'name'
  end
end
