"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from learning_notes_app import views

urlpatterns = [
    path("admin/", admin.site.urls),

    path('api/users/login/', views.MyTokenObtainPairView.as_view(),
         name='token-obtain-pair'),
    path('api/users/register/', views.registerUser, name='regiter-user'),
    path('api/users/profile/', views.getUserProfile, name='user-profile'),
    path('api/users/', views.getUsers, name='user-profile'),

    path("api/timeline/<int:pk>/", views.fetch_timeline, name='timeline'),
    path("api/learning_notes/create/<int:userId>/",
         views.add_learning_note, name='add-learning-note'),
    path("api/learning_notes/update/<int:pk>/",
         views.update_learning_note, name='update-learning-note'),
    path('api/learning_notes/<int:pk>/archive/',
         views.archive_learning_note, name='archive-learning-note'),
    path('api/learning_notes/<int:pk>/delete/',
         views.delete_learning_note, name='delete-learning-note'),
    path('api/learning-notes/<int:note_id>/add-label/',
         views.add_label_to_learning_note, name='add-label-to-learning-note'),
    path('api/learning-notes/<int:note_id>/remove-label/',
         views.remove_label_to_learning_note, name='remove-label-from-learning-note'),

    path('api/labels/<int:pk>/', views.label_list, name='label-list'),
    path('api/labels/create/', views.create_label, name='create-label'),
    path('api/labels/delete-label/<int:label_id>/', views.delete_label, name='delete-label'),
]
