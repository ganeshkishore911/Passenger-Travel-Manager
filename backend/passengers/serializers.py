from rest_framework import serializers 
from .models import Passenger
from travel.serializer import TravelSerializer


class PassengerSerializer(serializers.ModelSerializer):
    Travel=TravelSerializer(many=True,read_only=True)
    class Meta:
        model=Passenger
        fields=['id','name','Travel']