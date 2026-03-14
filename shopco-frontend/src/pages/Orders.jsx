import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import "../styles/cart.css"; // Reuse some cart styles for simplicity

function Orders() {
    const { token } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            api.get("/orders/")
                .then((res) => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [token]);

    if (loading) return <div className="container py-5 text-center">Loading orders...</div>;

    if (!orders.length) {
        return (
            <div className="container py-5 text-center">
                <h2>No Orders Found</h2>
            </div>
        );
    }

    return (
        <section className="orders-page py-5">
            <div className="container">
                <h2 className="mb-4 text-center">YOUR ORDERS</h2>
                <div className="row g-4">
                    {orders.map((order) => (
                        <div className="col-12" key={order.id}>
                            <div className="cart-items-box mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>Order #{order.id}</h5>
                                    <span className="text-muted">{new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                {order.items.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <img src={item.product.image} alt={item.product.name} />
                                        <div className="cart-item-info">
                                            <h4>{item.product.name}</h4>
                                            <p className="price">${item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-end mt-2">
                                    <strong>Total: ${order.total_price}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Orders;
