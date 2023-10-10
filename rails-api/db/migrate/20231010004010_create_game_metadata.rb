class CreateGameMetadata < ActiveRecord::Migration[7.1]
  def change
    create_table :game_metadata, id: :text, primary_key: "name" do |t|
      t.text :releasedate
      t.text :platforms
      t.text :developers
      t.text :genre
    end
  end
end
