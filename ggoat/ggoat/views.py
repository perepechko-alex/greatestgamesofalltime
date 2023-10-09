import sqlite3
from .lib.db import create_connection
from django.http import JsonResponse
from django.views.decorators.http import require_GET


@require_GET
def results(_):
    conn = create_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM results_with_metadata_1000")
    rows = cursor.fetchall()
    list_results = [dict(row) for row in rows]
    conn.close()
    return JsonResponse(list_results, safe=False)


@require_GET
def game_results(_, game):
    conn = create_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM results_with_metadata_1000 WHERE name=?", (game,))
    rows = cursor.fetchall()
    list_results = [dict(row) for row in rows]
    conn.close()
    return JsonResponse(list_results[0])


@require_GET
def get_game(_, game):
    conn = create_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(
        """SELECT name, rank, weightedpoints, publication, listyear, listtype FROM goat WHERE name=?
    ORDER BY listtype, rank NULLS LAST""",
        (game,),
    )
    rows = cursor.fetchall()
    list_results = [dict(row) for row in rows]
    conn.close()
    return JsonResponse(list_results, safe=False)
