from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name="home"),
    path('set-behaviour/', views.BehaviourView.as_view(), name="behaviour"),
]
