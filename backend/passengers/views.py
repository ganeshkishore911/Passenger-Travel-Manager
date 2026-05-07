from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Passenger
from travel.models import Travel
from .serializers import PassengerSerializer
from travel.serializer import TravelSerializer
import logging


logger=logging.getLogger(__name__)
class PassengerCreateView(APIView):
    
    def post(self,request):
        try:
            serilaizer=TravelSerializer(data=request.data)
            if serilaizer.is_valid():
                name=request.data.get("name")

                passenger,created=Passenger.objects.get_or_create(name=name)  #check if the person exist and created is for if passenger is exist return True

                travel=serilaizer.save(passenger=passenger)
                logger.info(f"Travel created for {name} from {travel.source} to {travel.destination}")
                return Response({"message":"created succuesfully","passenger_id":passenger.id,"created_new_password":created},status=status.HTTP_201_CREATED) 
            else:
                print(serilaizer.errors)
                return Response(serilaizer.errors, status=400)        
        except Exception as e:
            logger.error(f"Error creating travel: {str(e)}")
            return Response({"error": "Something went wrong"}, status=500)

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


