from django import urls
from django.urls import path
from . import views

urlpatterns = [
    path('api/register', views.register, name="register"),
    path('api/schedule', views.schedule, name="schedule"),
    path('api/available-jobs', views.available_jobs, name="available-jobs"),
    path('api/my-schedules', views.my_schedules, name="my_schedules"),
    path('api/accept-job', views.accept_job, name="accept_job"),
    path('api/my-jobs', views.my_jobs, name="my_jobs"),
    path('api/all-users', views.all_users, name="all_users"),
]