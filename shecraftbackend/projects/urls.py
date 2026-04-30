from django.urls import path
from .views import  projects_api,project_detail

urlpatterns = [
     path('projects/', projects_api),
      path('projects/<int:pk>/', project_detail),
]