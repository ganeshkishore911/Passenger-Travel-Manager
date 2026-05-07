from django.db import models
from passengers.models import Passenger

# Create your models here.
class Travel(models.Model):
    passenger=models.ForeignKey(Passenger,on_delete=models.CASCADE,related_name="Travel")
    source=models.CharField(max_length=100)
    destination=models.CharField(max_length=100)
    travel_date=models.DateField()

    def __str__(self):
        return f"{self.passenger} travelled from {self.source} to {self.destination}"