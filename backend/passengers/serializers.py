from rest_framework import serializers 
from .models import Passenger,Travel

class TravelSerializer(serializers.ModelSerializer):
    passenger_name=serializers.CharField(source="passenger.name",read_only=True)

    class Meta:
        model=Travel
        fields=['id','passenger','passenger_name','source','destination','travel_date']
    

class PassengerSerializer(serializers.ModelSerializer):
    Travel=TravelSerializer(many=True,read_only=True)
    class Meta:
        model=Passenger
        fields=['id','name','Travel']