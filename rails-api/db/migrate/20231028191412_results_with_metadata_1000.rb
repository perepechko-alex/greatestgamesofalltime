class ResultsWithMetadata1000 < ActiveRecord::Migration[7.1]
  def change
    execute <<~SQL
      CREATE VIEW IF NOT EXISTS results_with_metadata_1000 AS
        SELECT finalResults.rank, finalResults.name, finalResults.totalScore, finalResults.numOfLists, finalResults.avgListYear, game_metadata.releasedate, game_metadata.platforms, game_metadata.developers, game_metadata.genre FROM finalResults
        INNER JOIN game_metadata ON finalResults.name = game_metadata.name  WHERE finalResults.rank <= 1000
        ORDER BY CASE WHEN finalResults.rank IS NULL THEN 1 ELSE 0 END
    SQL
  end
end
