from django.urls import path
from .views import PassengerCreateView,PassengerDetail,PassengerDelete,TravelDelete,TravelUpdate,TravelList

urlpatterns = [
    path('create/',PassengerCreateView.as_view(),name='create-passenger'),
    path('travels/',TravelList.as_view(),name='list_travels'),
    path('passenger/<int:id>/',PassengerDetail.as_view(),name='passenger_detail'),
    path('travelUpdate/<int:id>/',TravelUpdate.as_view(),name="travel_update"),
    path('travelDelete/<int:id>/',TravelDelete.as_view(),name='travel_delete'),
    path('passengerDelete/<int:id>/',PassengerDelete.as_view(),name="passenger_delete"),

]
