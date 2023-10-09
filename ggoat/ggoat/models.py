from django.db import models


class Game_Metadata(models.Model):
    name = models.TextField(primary_key=True)
    releasedate = models.TextField()
    platforms = models.TextField()
    developers = models.TextField()
    genre = models.TextField()


class Final_Results(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["rank", "name"], name="unique_game")
        ]

    rank = models.PositiveSmallIntegerField()
    name = models.ForeignKey(
        Game_Metadata, on_delete=models.CASCADE, related_name="game_name"
    )
    totalscore = models.DecimalField(max_digits=17, decimal_places=14)
    numoflists = models.PositiveSmallIntegerField()
    avglistyear = models.PositiveSmallIntegerField()
