from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Product
from .serializers import ProductSerializer


class ProductListView(ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.all()

        category = self.request.query_params.get("category")
        color = self.request.query_params.get("color")
        max_price = self.request.query_params.get("max_price")
        search = self.request.query_params.get("search")

        if category:
            queryset = queryset.filter(category=category)

        if color:
            queryset = queryset.filter(color=color)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        if search:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        return queryset

    def perform_create(self, serializer):
        # Allow anyone to create for this "working model" but ideally use IsAdminUser
        serializer.save()


class ProductDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
