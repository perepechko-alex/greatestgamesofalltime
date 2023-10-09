from django.urls import path

from . import views

urlpatterns = [
    path("results/", views.results, name="results"),
    path("results/<str:game>/", views.game_results, name="game_results"),
    path("<str:game>/", views.get_game, name="get_game"),
]
