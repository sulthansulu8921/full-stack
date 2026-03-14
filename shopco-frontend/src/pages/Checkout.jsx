import { checkout } from "../features/orders/orderAPI";

function Checkout() {
  const placeOrder = async () => {
    const res = await checkout();
    alert(`Order placed. ID: ${res.order_id}`);
  };

  return <button onClick={placeOrder}>Place Order</button>;
}

export default Checkout;
