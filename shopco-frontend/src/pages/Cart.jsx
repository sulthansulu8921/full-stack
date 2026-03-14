import { useDispatch, useSelector } from "react-redux";
import { loadCart, updateItemQuantity, deleteItemFromCart, checkout, resetOrderState } from "../features/cart/cartSlice";
import "../styles/cart.css";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();
  const { items: cart, orderPlaced: showOrderPlaced } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = subtotal * 0.2;
  const delivery = cart.length ? 15 : 0;
  const total = subtotal - discount + delivery;

  if (!cart.length && !showOrderPlaced) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <div className="container">
        <h2 className="cart-title">YOUR CART</h2>

        <div className="row g-4">
          {/* LEFT */}
          <div className="col-lg-8">
            <div className="cart-items-box">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />

                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    <p className="price">${item.product.price}</p>
                  </div>

                  <div className="cart-actions">
                    <button
                      className="delete-btn"
                      onClick={() => dispatch(deleteItemFromCart(item.product.id))}
                    >
                      <FiTrash2 />
                    </button>

                    <div className="qty">
                      <button
                        onClick={() =>
                          dispatch(updateItemQuantity({ productId: item.product.id, quantity: Math.max(1, item.quantity - 1) }))
                        }
                      >
                        <FiMinus />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(updateItemQuantity({ productId: item.product.id, quantity: item.quantity + 1 }))
                        }
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row discount">
                <span>Discount (20%)</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${delivery}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => dispatch(checkout())}
              >
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showOrderPlaced && (
        <>
          <div className="order-overlay" />
          <div className="order-modal">
            <h3>🎉 Order Placed!</h3>
            <p>Your order has been placed successfully.</p>
            <button
              className="ok-btn"
              onClick={() => dispatch(resetOrderState())}
            >
              OK
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
