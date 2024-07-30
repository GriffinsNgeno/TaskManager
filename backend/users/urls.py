from django.urls import path
from .views import register_view, login_view, logout_view, UserDetailView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('token/', UserDetailView.as_view(), name='user-detail'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
