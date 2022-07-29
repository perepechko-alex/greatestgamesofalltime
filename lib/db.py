import sqlite3


def create_connection():
    return sqlite3.connect('./data/out/ggoat.db')


def create_final_results_table(conn):
    conn.execute('DROP TABLE IF EXISTS "finalResults"')
    conn.execute('''CREATE TABLE IF NOT EXISTS "finalResults" (
        "rank"	INTEGER,
        "name"	TEXT NOT NULL,
        "totalscore"	NUMERIC NOT NULL,
        "numoflists" INTEGER NOT NULL,
        "avglistyear" INTEGER,
        PRIMARY KEY("rank","name"),
        FOREIGN KEY("name") REFERENCES "game_metadata"("name")
    )''')


def create_views(conn):
    conn.execute('''CREATE VIEW IF NOT EXISTS results_with_metadata AS
        SELECT finalResults.rank, finalResults.name, finalResults.totalScore, finalResults.numOfLists, finalResults.avgListYear, game_metadata.releasedate, game_metadata.platforms, game_metadata.developers, game_metadata.genre FROM finalResults
        INNER JOIN game_metadata ON finalResults.name = game_metadata.name
        ORDER BY CASE WHEN finalResults.rank IS NULL THEN 1 ELSE 0 END, finalResults.rank''')
    conn.execute('''CREATE VIEW IF NOT EXISTS results_with_metadata_1000 AS
        SELECT finalResults.rank, finalResults.name, finalResults.totalScore, finalResults.numOfLists, finalResults.avgListYear, game_metadata.releasedate, game_metadata.platforms, game_metadata.developers, game_metadata.genre FROM finalResults
        INNER JOIN game_metadata ON finalResults.name = game_metadata.name  WHERE finalResults.rank <= 1000
        ORDER BY CASE WHEN finalResults.rank IS NULL THEN 1 ELSE 0 END''')


def create_tables(conn):
    conn.execute('''CREATE TABLE IF NOT EXISTS "game_metadata" (
        "name"	TEXT NOT NULL,
        "releasedate"	TEXT,
        "platforms"	TEXT,
        "developers" TEXT,
        "genre" TEXT,
        PRIMARY KEY("name"))''')
    conn.execute('DROP TABLE IF EXISTS "goat"')
    conn.execute('''CREATE TABLE IF NOT EXISTS "goat" (
        "filename"	TEXT NOT NULL,
        "listyear"	TEXT NOT NULL,
        "publication"	TEXT NOT NULL,
        "listtype" TEXT NOT NULL,
        "rank"	INTEGER,
        "name"	TEXT NOT NULL,
        "weightedpoints"	NUMERIC NOT NULL,
        "isranked"	INTEGER NOT NULL,
        "notes" TEXT,
        PRIMARY KEY("filename","weightedpoints","name","publication", "listyear", "rank"),
        FOREIGN KEY("name") REFERENCES "game_metadata"("name"))''')


def create_all_tables(conn):
    create_tables(conn)
    create_views(conn)
    create_final_results_table(conn)
