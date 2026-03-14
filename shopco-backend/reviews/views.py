from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Review
from .serializers import ReviewSerializer
from products.models import Product


@api_view(["GET", "POST"])
@permission_classes([AllowAny])  # Guest reviews allowed
def product_reviews(request, product_id):

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # ================= GET REVIEWS =================
    if request.method == "GET":
        reviews = Review.objects.filter(
            product=product
        ).order_by("-created_at")

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    # ================= CREATE REVIEW =================
    if request.method == "POST":
        serializer = ReviewSerializer(
            data={
                "product": product.id,
                "rating": request.data.get("rating"),
                "text": request.data.get("text"),
                "name": "Guest",
            }
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
