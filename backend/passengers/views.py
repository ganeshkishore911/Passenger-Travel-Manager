from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Passenger,Travel
from .serializers import PassengerSerializer

class PassengerCreateView(APIView):
    
    def post(self,request):
        name=request.data.get("name")
        source=request.data.get("source")
        destination=request.data.get("destination")
        travel_data=request.data.get("travel_date")

        passenger,created=Passenger.objects.get_or_create(name=name)  #check if the person exist
        travel=Travel.objects.create(passenger=passenger,source=source,destination=destination,travel_data=travel_data)
        return Response({"message":"created succuesfully"})
    
class PassengerDetail(APIView):
    def get_object(self,id):
        try:
            return Passenger.objects.get(id=id)
        except Passenger.DoesNotExist:
            return None
    def get(self,request,id):
        passenger=self.get_object(id)
        if not passenger:
            return Response({"error":"Not Found"})
        serializer=PassengerSerializer(passenger)
        return Response(serializer.data)