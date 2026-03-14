from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer
from cart.models import CartItem

class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_items = CartItem.objects.filter(user=request.user)

        if not cart_items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=400
            )

        total = sum(
            item.product.price * item.quantity
            for item in cart_items
        )

        # 1. Create Order
        order = Order.objects.create(
            user=request.user,
            total_price=total,
            is_paid=True
        )

        # 2. Create Order Items
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                price=item.product.price,
                quantity=item.quantity
            )

        # 3. Clear Cart
        cart_items.delete()

        return Response({
            "message": "Order placed successfully",
            "order_id": order.id
        })
