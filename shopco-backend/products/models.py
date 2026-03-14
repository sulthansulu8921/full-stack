from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.URLField() 
    category = models.CharField(max_length=50)
    color = models.CharField(max_length=50, blank=True)
    description = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    reviews_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name
