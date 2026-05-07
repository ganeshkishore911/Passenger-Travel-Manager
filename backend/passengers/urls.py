from django.urls import path
from .views import PassengerCreateView,PassengerDetail,PassengerDelete

urlpatterns = [
    path('create/',PassengerCreateView.as_view(),name='create-passenger'),
    path('passenger/<int:id>/',PassengerDetail.as_view(),name='passenger_detail'),
    path('passengerDelete/<int:id>/',PassengerDelete.as_view(),name="passenger_delete"),

]
