from django.urls import path
from .views import  generate_portfolio

urlpatterns = [
     path('generate-portfolio/', generate_portfolio),
]