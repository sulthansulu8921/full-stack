from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CartItem
from products.models import Product
from .serializers import CartItemSerializer

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product
        )
        if not created:
            item.quantity += 1
        item.save()

        return Response({"message": "Added to cart"})

class UpdateCartView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        
        try:
            item = CartItem.objects.get(user=request.user, product__id=product_id)
            if quantity > 0:
                item.quantity = quantity
                item.save()
            else:
                item.delete()
            return Response({"message": "Cart updated"})
        except CartItem.DoesNotExist:
            return Response({"error": "Item not in cart"}, status=404)

class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        product_id = request.data.get('product_id')
        CartItem.objects.filter(user=request.user, product__id=product_id).delete()
        return Response({"message": "Item removed"})

