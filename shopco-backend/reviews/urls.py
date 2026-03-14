from django.urls import path
from .views import product_reviews

urlpatterns = [
    path("product/<int:product_id>/", product_reviews),
]
