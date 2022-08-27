import sqlite3

from flask import Flask, jsonify
from ..db import create_connection

app = Flask(__name__)


@app.route("/api/results", methods=['GET'])
def get_results():
    conn = create_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM results_with_metadata_1000")
    rows = cursor.fetchall()
    results = [dict(row) for row in rows]
    conn.close()
    return jsonify(results)


@app.route("/api/results/<string:game>", methods=['GET'])
def get_game_results(game):
    conn = create_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM results_with_metadata_1000 WHERE name=?", (game,))
    rows = cursor.fetchall()
    results = [dict(row) for row in rows]
    conn.close()
    return jsonify(results[0])


@app.route("/api/<string:game>", methods=['GET'])
def get_game(game):
    conn = create_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('''SELECT name, rank, weightedpoints, publication, listyear, listtype FROM goat WHERE name=?
    ORDER BY listtype, rank NULLS LAST''', (game,))
    rows = cursor.fetchall()
    results = [dict(row) for row in rows]
    conn.close()
    return jsonify(results)
