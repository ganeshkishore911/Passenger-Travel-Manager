from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Passenger,Travel
from .serializers import PassengerSerializer,TravelSerializer

class PassengerCreateView(APIView):
    
    def post(self,request):
        name=request.data.get("name")
        source=request.data.get("source")
        destination=request.data.get("destination")
        travel_date=request.data.get("travel_date")

        passenger,created=Passenger.objects.get_or_create(name=name)  #check if the person exist and created is for if passenger is exist return True
        travel=Travel.objects.create(passenger=passenger,source=source,destination=destination,travel_date=travel_date)
        return Response({"message":"created succuesfully","passenger_id":passenger.id,"created_new_password":created},status=status.HTTP_201_CREATED) 
    

def get_Passenger_object(id):
        try:
            return Passenger.objects.get(id=id)
        except Passenger.DoesNotExist:
            return None   
 
class PassengerDetail(APIView):
    def get(self,request,id):
        passenger=get_Passenger_object(id)
        if not passenger:
            return Response({"error":"Not Found"})
        print("ID RECEIVED:", id)
        serializer=PassengerSerializer(passenger)
        return Response(serializer.data)
    
class PassengerDelete(APIView):
    def delete(self,request,id):
        passenger=get_Passenger_object(id)
        passenger.delete()
        return Response({"message":"Deleted successfully"},status=status.HTTP_204_NO_CONTENTt)


class TravelList(APIView):
    def get(self,request):
        travels=Travel.objects.all().order_by('-id')
        serilaizer=TravelSerializer(travels,many=True)
        return Response(serilaizer.data,status=status.HTTP_200_OK)
    

def get_Travel_object(id):
        try:
            return Travel.objects.get(id=id)
        except Travel.DoesNotExist:
            return None    
class TravelUpdate(APIView):
        
    def put(self,request,id):
        travel=get_Travel_object(id)
        serilaizer=TravelSerializer(travel,data=request.data,partial=True)
        if serilaizer.is_valid():
            serilaizer.save()
            return Response(serilaizer.data,status=status.HTTP_201_CREATED)
        return Response(serilaizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class TravelDelete(APIView):
    def delete(self,request,id):
        travel=get_Travel_object(id)
        travel.delete()
        return Response({"message":"Deleted successfully"},status=status.HTTP_204_NO_CONTENT)

