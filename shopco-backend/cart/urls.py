from django.urls import path
from .views import CartView, UpdateCartView, RemoveFromCartView

urlpatterns = [
    path('', CartView.as_view()),
    path('update/', UpdateCartView.as_view()),
    path('remove/', RemoveFromCartView.as_view()),
]
