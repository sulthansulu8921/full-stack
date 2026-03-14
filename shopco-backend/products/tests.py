from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Product

class ProductSearchTests(APITestCase):
    def setUp(self):
        Product.objects.create(name="Neon T-shirt", price=20.00, category="T-shirts", description="Bright neon color")
        Product.objects.create(name="Blue Jeans", price=40.00, category="Jeans", description="Classic blue denim")
        Product.objects.create(name="Summer Hat", price=15.00, category="Accessories", description="Lightweight sun protection")

    def test_search_by_name(self):
        url = reverse('product-list') + "?search=Neon"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Neon T-shirt")

    def test_search_by_description(self):
        url = reverse('product-list') + "?search=denim"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Blue Jeans")

    def test_search_no_results(self):
        url = reverse('product-list') + "?search=Keyboard"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
