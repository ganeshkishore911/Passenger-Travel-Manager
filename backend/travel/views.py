from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Travel
from passengers.serializers import TravelSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
import logging

logger=logging.getLogger(__name__)

# Create your views here.
@method_decorator(cache_page(60),name='dispatch')
class TravelList(APIView):
    def get(self,request):
        print("DATABASE HIT")  #testing cache
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
        try:
            travel=get_Travel_object(id)
            travel.delete()
            logger.warning(f"travel with id{id} deleted")
            return Response({"message":"Deleted successfully"},status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Delete failed : {str(e)}")
            return Response({"error":"Delete failed"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
