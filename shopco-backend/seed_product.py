import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Product

def seed():
    # Clear existing products to ensure fresh seed
    Product.objects.all().delete()
    
    products_data = [
        # T-shirts
        {
            "name": "T-shirt with Tape Details",
            "price": 120.00,
            "original_price": None,
            "rating": 4.5,
            "reviews_count": 145,
            "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
            "category": "T-shirts",
            "color": "Black",
            "description": "Premium cotton t-shirt with unique tape detailing on sleeves."
        },
        {
            "name": "Sleeve Striped T-shirt",
            "price": 130.00,
            "original_price": 160.00,
            "rating": 4.5,
            "reviews_count": 85,
            "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
            "category": "T-shirts",
            "color": "Green",
            "description": "Stylish striped t-shirt for a sporty weekend look."
        },
        {
            "name": "Courage Graphic T-shirt",
            "price": 145.00,
            "original_price": None,
            "rating": 4.0,
            "reviews_count": 45,
            "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
            "category": "T-shirts",
            "color": "Orange",
            "description": "Bold graphic t-shirt that expresses your unique personality."
        },
        {
            "name": "Polo Style T-shirt",
            "price": 150.00,
            "original_price": 180.00,
            "rating": 4.2,
            "reviews_count": 92,
            "image": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800",
            "category": "T-shirts",
            "color": "Blue",
            "description": "Classic polo style t-shirt for a refined casual look."
        },
        # Shirts
        {
            "name": "Checkered Shirt",
            "price": 180.00,
            "original_price": None,
            "rating": 4.5,
            "reviews_count": 120,
            "image": "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800",
            "category": "Shirts",
            "color": "Red",
            "description": "Classic checkered shirt made from breathable cotton blend."
        },
        {
            "name": "Vertical Striped Shirt",
            "price": 212.00,
            "original_price": 232.00,
            "rating": 5.0,
            "reviews_count": 50,
            "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
            "category": "Shirts",
            "color": "Blue",
            "description": "Elegant vertical striped shirt suitable for smart casual occasions."
        },
        {
            "name": "White Linen Shirt",
            "price": 190.00,
            "original_price": 210.00,
            "rating": 4.8,
            "reviews_count": 75,
            "image": "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=800",
            "category": "Shirts",
            "color": "White",
            "description": "Breathable white linen shirt, perfect for summer days."
        },
        {
            "name": "Denim Shirt",
            "price": 220.00,
            "original_price": None,
            "rating": 4.6,
            "reviews_count": 110,
            "image": "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=800",
            "category": "Shirts",
            "color": "Blue",
            "description": "Durable denim shirt for a rugged and stylish look."
        },
        # Jeans
        {
            "name": "Skinny Fit Jeans",
            "price": 240.00,
            "original_price": 260.00,
            "rating": 3.5,
            "reviews_count": 230,
            "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
            "category": "Jeans",
            "color": "Blue",
            "description": "Comfortable skinny fit jeans with a modern silhouette."
        },
        {
            "name": "Faded Skinny Jeans",
            "price": 210.00,
            "original_price": None,
            "rating": 4.5,
            "reviews_count": 210,
            "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
            "category": "Jeans",
            "color": "Black",
            "description": "Trendy faded skinny jeans that pair perfectly with any top."
        },
        {
            "name": "Slim Fit Raw Denim",
            "price": 280.00,
            "original_price": 300.00,
            "rating": 4.9,
            "reviews_count": 42,
            "image": "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800",
            "category": "Jeans",
            "color": "Blue",
            "description": "Premium raw denim jeans with a sleek slim fit."
        },
        {
            "name": "Straight Leg Black Jeans",
            "price": 200.00,
            "original_price": None,
            "rating": 4.4,
            "reviews_count": 88,
            "image": "https://images.unsplash.com/photo-1584305116359-1965f36e386a?w=800",
            "category": "Jeans",
            "color": "Black",
            "description": "Classic straight-leg jeans in a deep black wash."
        },
        # Accessories
        {
            "name": "Loose Fit Bermuda Shorts",
            "price": 80.00,
            "original_price": None,
            "rating": 3.0,
            "reviews_count": 30,
            "image": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
            "category": "Accessories",
            "color": "Green",
            "description": "Relaxed fit Bermuda shorts for maximum comfort in summer."
        },
        {
            "name": "Leather Belt",
            "price": 45.00,
            "original_price": 55.00,
            "rating": 4.7,
            "reviews_count": 150,
            "image": "https://images.unsplash.com/photo-1617137968427-8393e002a281?w=800",
            "category": "Accessories",
            "color": "Brown",
            "description": "High-quality leather belt with a classic buckle."
        },
        {
            "name": "Canvas Backpack",
            "price": 120.00,
            "original_price": None,
            "rating": 4.5,
            "reviews_count": 65,
            "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
            "category": "Accessories",
            "color": "Orange",
            "description": "Spacious canvas backpack for all your daily essentials."
        },
        {
            "name": "Sports Cap",
            "price": 25.00,
            "original_price": 35.00,
            "rating": 4.3,
            "reviews_count": 210,
            "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",
            "category": "Accessories",
            "color": "Blue",
            "description": "Breathable sports cap for your outdoor activities."
        }
    ]

    for p_data in products_data:
        Product.objects.create(**p_data)
    
    print(f"Successfully seeded {len(products_data)} products.")

if __name__ == "__main__":
    seed()
