from rest_framework import serializers 
from .models import Travel



class TravelSerializer(serializers.ModelSerializer):
    passenger_name=serializers.CharField(source="passenger.name",read_only=True)

    class Meta:
        model=Travel
        fields=['id','passenger','passenger_name','source','destination','travel_date']
        extra_kwargs = {'passenger': {'required': False}}
