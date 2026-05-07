from django.urls import path
from .views import TravelDelete,TravelUpdate,TravelList

urlpatterns=[
        path('travels/',TravelList.as_view(),name='list_travels'),
        path('travelUpdate/<int:id>/',TravelUpdate.as_view(),name="travel_update"),
        path('travelDelete/<int:id>/',TravelDelete.as_view(),name='travel_delete'),

]