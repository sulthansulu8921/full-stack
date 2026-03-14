import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def log(msg):
    print(f"[TEST] {msg}")

def run_test():
    session = requests.Session()

    # 1. Register
    username = "testuser_verify"
    email = "test@example.com"
    password = "password123"
    
    log(f"Registering user: {username}")
    res = requests.post(f"{BASE_URL}/auth/register/", json={
        "username": username,
        "email": email,
        "password": password
    })
    # Ignore 400 if user exists
    if res.status_code == 200:
        log("Registration successful")
    elif res.status_code == 400 and "username" in res.json():
        log("User already exists, proceeding to login")
    else:
        log(f"Registration failed: {res.text}")
        return

    # 2. Login
    log("Logging in...")
    res = requests.post(f"{BASE_URL}/auth/login/", json={
        "username": username,
        "password": password
    })
    if res.status_code != 200:
        log(f"Login failed: {res.text}")
        return
    
    tokens = res.json()
    access_token = tokens["access"]
    headers = {"Authorization": f"Bearer {access_token}"}
    log("Login successful, token received")

    # 3. Create a Product (via Shell/Admin usually, but here we might fail if empty)
    # We'll try to list products first.
    log("Listing products...")
    res = requests.get(f"{BASE_URL}/products/")
    products = res.json()
    if not products:
        log("No products found. Cannot test cart without products.")
        log("Please create a product manually or via admin.")
        # Attempt to create product via code is hard without admin access token or a script
        return

    product_id = products[0]["id"]
    log(f"Using Product ID: {product_id}")

    # 4. Add to Cart
    log("Adding to cart...")
    res = requests.post(f"{BASE_URL}/cart/", json={"product_id": product_id}, headers=headers)
    if res.status_code == 200:
        log("Added to cart (Response: " + str(res.json()) + ")")
    else:
        log(f"Add to cart failed: {res.text}")
        return

    # 5. Get Cart
    log("Fetching cart...")
    res = requests.get(f"{BASE_URL}/cart/", headers=headers)
    cart = res.json()
    log(f"Cart items: {len(cart)}")
    if len(cart) == 0:
        log("Cart is empty! Test failed.")
        return
    
    # 6. Checkout
    log("Checking out...")
    res = requests.post(f"{BASE_URL}/orders/checkout/", headers=headers)
    if res.status_code == 200:
        log("Checkout successful")
        log(f"Order ID: {res.json().get('order_id')}")
    else:
        log(f"Checkout failed: {res.text}")
        return

    # 7. Verify Order
    log("Verifying orders...")
    res = requests.get(f"{BASE_URL}/orders/", headers=headers)
    orders = res.json()
    if len(orders) > 0:
        log(f"Orders found: {len(orders)}")
        detailed_order = orders[0]
        # Check if items are implemented in serializer
        if "items" in detailed_order:
             log(f"Order items verification: FOUND ({len(detailed_order['items'])} items)")
        else:
             log("Order items verification: MISSING in response (Serializer update needed?)")
    else:
        log("No orders found! Test failed.")

if __name__ == "__main__":
    run_test()
