from django.urls import path
from .views import Index, Client


app_name='main'

urlpatterns = [
    path('', Index, name='index'),
    path('<int:id>/', Client, name='index'),
]
